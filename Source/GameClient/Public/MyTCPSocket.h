#pragma once
#include "Runtime/Core/Public/Containers/UnrealString.h"
#include "Runtime/Sockets/Public/Sockets.h"

class MyTCPSocket {
private:
	FSocket * SocketClient;
public:
	MyTCPSocket();
	FString StringFromBinaryArray(TArray<uint8> BinaryArray);
	bool SocketCreate(FString ip, int port);
	bool SocketSend(FString sendMessage);
	bool SocketSendCharMsg(char* sendMessage, int size);
	void SocketReceive(bool & bReceive, FString & recvMessage);
	int SocketReceiveCharMsg(char* recvMessage);
	void SocketClose();
};
