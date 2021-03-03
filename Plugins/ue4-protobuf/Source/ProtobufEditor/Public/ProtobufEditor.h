// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

#pragma once

#include "CoreMinimal.h"
#include "Modules/ModuleManager.h"

class FToolBarBuilder;
class FMenuBuilder;

class FProtobufEditorModule : public IModuleInterface
{
public:

	/** IModuleInterface implementation */
	virtual void StartupModule() override;
	virtual void ShutdownModule() override;
	
	/** This function will be bound to Command. */
	void PluginButtonClicked();
	
private:

	void AddToolbarExtension(FToolBarBuilder& Builder);
	void AddMenuExtension(FMenuBuilder& Builder);

	FString GetProtocPath()const;
	void ExecuteProtoc(const FString& pProtocExe, const FString& pProtoFilePath, FString pOutPath=TEXT(""), FString pLang=TEXT("cpp"),bool pWaitProcExit=false);
	void RenameAllProtoCodeFiles(const FString& PbCcPath);
	void DeleteAllProtoCodeFile(const FString& PbPath);
private:
	TSharedPtr<class FUICommandList> PluginCommands;
};
