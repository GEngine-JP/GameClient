#include "MyTCPSocket.h"
#include "Runtime/Sockets/Public/SocketSubsystem.h"
#include "Runtime/Networking/Public/Interfaces/IPv4/IPv4Address.h"
#include "Runtime/Core/Public/Templates/SharedPointer.h"
#include "Runtime/Core/Public/Templates/SharedPointerInternals.h"
#include "Runtime/Sockets/Public/IPAddress.h"

MyTCPSocket::MyTCPSocket() : SocketClient(nullptr)
{
	UE_LOG(LogTemp, Warning, TEXT("MyTCPSocket constr"));
}

FString MyTCPSocket::StringFromBinaryArray(TArray<uint8> BinaryArray)
{
	return FString(ANSI_TO_TCHAR(reinterpret_cast<const char*>(BinaryArray.GetData())));
}



void EndianSwap(uint8 *pData, int startIndex, int length)
{

	

	
	int i,cnt,end,start;
	cnt = length / 2;
	start = startIndex;
	end  = startIndex + length - 1;
	uint8 tmp;
	for (i = 0; i < cnt; i++)
	{
		tmp            = pData[start+i];
		pData[start+i] = pData[end-i];
		pData[end-i]   = tmp;
	}
}

bool MyTCPSocket::SocketCreate(FString ipStr, int port)
{
	UE_LOG(LogTemp, Warning, TEXT("SocketCreate begin"));
	SocketClient = ISocketSubsystem::Get(PLATFORM_SOCKETSUBSYSTEM)->CreateSocket(NAME_Stream, TEXT("default"), false);
	FIPv4Address ip;
	FIPv4Address::Parse(ipStr, ip);

	TSharedRef<FInternetAddr, ESPMode::NotThreadSafe> addr = ISocketSubsystem::Get(PLATFORM_SOCKETSUBSYSTEM)->
		CreateInternetAddr();
	addr->SetIp(ip.Value);
	addr->SetPort(port);
	if (SocketClient->Connect(*addr))
	{
		//GEngine->AddOnScreenDebugMessage(1, 2.0f, FColor::Green, TEXT("Connect Succ!"));
		UE_LOG(LogTemp, Warning, TEXT("______Connect Succ!"));
		return true;
	}
	else
	{
		//GEngine->AddOnScreenDebugMessage(1, 2.0f, FColor::Green, TEXT("Connect failed!"));
		UE_LOG(LogTemp, Warning, TEXT("_____Connect failed!"));
		return false;
	}
}

bool MyTCPSocket::SocketSend(FString meesage)
{
	TCHAR* seriallizedChar = meesage.GetCharArray().GetData();
	int32 size = FCString::Strlen(seriallizedChar) + 1;
	int32 sent = 0;

	if (SocketClient->Send((uint8*)TCHAR_TO_UTF8(seriallizedChar), size, sent))
	{
		UE_LOG(LogTemp, Warning, TEXT("_____Send Succ!"));
		return true;
	}
	else
	{
		UE_LOG(LogTemp, Warning, TEXT("_____Send failed!"));
		return false;
	}
}

bool MyTCPSocket::SocketSendCharMsg(char* meesage, int size)
{
	int32 sent = 0;

	if (SocketClient->Send((uint8*)meesage, size, sent))
	{
		UE_LOG(LogTemp, Warning, TEXT("_____Send Succ!"));
		return true;
	}
	else
	{
		UE_LOG(LogTemp, Warning, TEXT("_____Send failed!"));
		return false;
	}
}


void MyTCPSocket::SocketReceive(bool& bReceive, FString& recvMessage)
{
	recvMessage = "";
	bReceive = false;
	if (!SocketClient)
	{
		return;
	}

	TArray<uint8> ReceiveData;
	uint32 size;
	uint8 element = 0;
	while (SocketClient->HasPendingData(size))
	{
		ReceiveData.Init(element, FMath::Min(size, 65507u));

		int32 read = 0;
		SocketClient->Recv(ReceiveData.GetData(), ReceiveData.Num(), read);
	}

	if (ReceiveData.Num() <= 0)
	{
		return;
	}

	const FString ReceivedUE4String = StringFromBinaryArray(ReceiveData);

	recvMessage = ReceivedUE4String;
	bReceive = true;
}

int MyTCPSocket::SocketReceiveCharMsg(char* recvMessage)
{
	if (!SocketClient)
	{
		return -1;
	}
	int32 read = 0;
	SocketClient->Recv((uint8*)recvMessage, 1024, read);
	UE_LOG(LogTemp, Warning, TEXT("read___%d"), read);
	return read;
}

void MyTCPSocket::SocketClose()
{
	if (SocketClient)
	{
		//关闭，销毁
		UE_LOG(LogTemp, Warning, TEXT("SocketClose"));
		SocketClient->Close();
		ISocketSubsystem::Get(PLATFORM_SOCKETSUBSYSTEM)->DestroySocket(SocketClient);
	}
}
