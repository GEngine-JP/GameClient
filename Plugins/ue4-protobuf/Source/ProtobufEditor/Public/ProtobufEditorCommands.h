// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Framework/Commands/Commands.h"
#include "ProtobufEditorStyle.h"

class FProtobufEditorCommands : public TCommands<FProtobufEditorCommands>
{
public:

	FProtobufEditorCommands()
		: TCommands<FProtobufEditorCommands>(TEXT("ProtobufEditor"), NSLOCTEXT("Contexts", "ProtobufEditor", "ProtobufEditor Plugin"), NAME_None, FProtobufEditorStyle::GetStyleSetName())
	{
	}

	// TCommands<> interface
	virtual void RegisterCommands() override;

public:
	TSharedPtr< FUICommandInfo > PluginAction;
};
