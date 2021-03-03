// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

#include "ProtobufEditorCommands.h"

#define LOCTEXT_NAMESPACE "FProtobufEditorModule"

void FProtobufEditorCommands::RegisterCommands()
{
	UI_COMMAND(PluginAction, "Protoc", "Execute Protoc action(Generate .pb.cpp/.pb.h File)", EUserInterfaceActionType::Button, FInputGesture());
}

#undef LOCTEXT_NAMESPACE
