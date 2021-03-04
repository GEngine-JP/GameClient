// Fill out your copyright notice in the Description page of Project Settings.


#include "MyCharacter.h"
#include "MyTCPSocket.h"
#include "../Message/UserMessage.pb.h"
#include "vector"
#include "Engine.h"
using namespace std;

int countNum = 0;

struct MsgStruct
{
	int messageId;
	char* data;
	int size;
};

void Decode(vector<MsgStruct*> msgVec, int checkNum)
{
	UE_LOG(LogTemp, Warning, TEXT("Decode"));

	vector<char*> tempArr;

	char cache[1024];
	memset(cache, 0, sizeof(cache));

	int cachePos = 0;

	for (auto& msg : msgVec)
	{
		memcpy(cache + cachePos, msg->data, msg->size);
		int len = cachePos + msg->size;
		while (len > 4)
		{
			if (cache[0] != checkNum / 256 || cache[1] != checkNum % 256)
			{
				//校验位不匹配
				// printf("校验位不匹配：%d, %d", cache[0], cache[1]);
				cachePos = 0;
				break;
			}
			int msgLen = cache[2] + cache[3] * 256;
			if (msgLen <= 0 || msgLen > 10240)
			{
				//如果读到的长度不合理，认为是数据错误，丢弃
				// printf("长度错误：%d", msgLen);
				cachePos = 0;
				break;
			}
			if (msgLen > len - 4)
			{
				//断包
				// printf("断包，消息长度为：%d", msgLen);
				cachePos = len;
				break;
			}
			//printf("msgLen = %d\n", msgLen);
			char* newMsgData = new char[msgLen];
			memcpy(newMsgData, cache + 4, msgLen);
			tempArr.push_back(newMsgData);

			if (len > 4 + msgLen)
			{
				//粘包
				// printf("粘包，数据长度为：%d\n", len);
				cachePos = 0;
				len -= (4 + msgLen);
				memcpy(cache, cache + 4 + msgLen, len);
			}
			else
			{
				cachePos = 0;
				len = 0;
			}
		}
	}

	for (auto& msg : msgVec)
	{
		delete msg->data;
	}
	// msgVec.empty();

	for (auto& msg : tempArr)
	{
		countNum++;
		ResUserLogin toClientMsg;
		toClientMsg.ParseFromArray(msg, strlen(msg));
		GEngine->AddOnScreenDebugMessage(-1, 5.0f, FColor::Green, toClientMsg.DebugString().c_str());
		UE_LOG(LogTemp, Warning, TEXT("[%d]->%s"), countNum, toClientMsg.DebugString().c_str());
	}
}


// Sets default values
AMyCharacter::AMyCharacter()
{
	// Set this character to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;
}

// Called when the game starts or when spawned
void AMyCharacter::BeginPlay()
{
	Super::BeginPlay();
	MyTCPSocket myTcpSocketClient;
	if (myTcpSocketClient.SocketCreate("127.0.0.1", 9101))
	{
		UE_LOG(LogTemp, Warning, TEXT("connnect success____"));
	}
	else
	{
		UE_LOG(LogTemp, Warning, TEXT("connnect fail____"));
	}

	char sendMessage[1024];
	FMemory::Memzero(sendMessage, sizeof(sendMessage));
	// 构造protobuf消息
	ReqUserLogin* LoginReq = new ReqUserLogin();
	LoginReq->set_loginname("ue4");
	int len = LoginReq->ByteSize() + sizeof(uint8);
	LoginReq->SerializePartialToArray(sendMessage, len);

	int msgId = 101001;
	char* sendPackMessage = new char[len];
	sendPackMessage[0] = len;
	sendPackMessage[1] = msgId;
	FMemory::Memcpy(sendPackMessage, sendMessage, len);

	if (myTcpSocketClient.SocketSendCharMsg(sendPackMessage, len + 4))
	{
		UE_LOG(LogTemp, Warning, TEXT("send message____"));
	}
	else
	{
		UE_LOG(LogTemp, Warning, TEXT("send message fail"));
	}
	bool recvRet = false;

	char recvMessage[1024];
	FMemory::Memzero(recvMessage, sizeof(recvMessage));
	int ret = myTcpSocketClient.SocketReceiveCharMsg(recvMessage);
	if (ret > 0)
	{
		UE_LOG(LogTemp, Warning, TEXT("recv message ret____%d"), ret);
		//解析数据
		vector<MsgStruct*> msgVec;
		MsgStruct msgstruct;
		msgstruct.size = ret;
		msgstruct.data = new char[ret];
		FMemory::Memcpy(msgstruct.data, recvMessage, ret);
		msgVec.push_back(&msgstruct);

		Decode(msgVec, msgId);
	}
	else
	{
		UE_LOG(LogTemp, Warning, TEXT("recv message fail"));
	}

	//myTcpSocketClient.SocketClose();
}

// Called every frame
void AMyCharacter::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);
}

// Called to bind functionality to input
void AMyCharacter::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);
}
