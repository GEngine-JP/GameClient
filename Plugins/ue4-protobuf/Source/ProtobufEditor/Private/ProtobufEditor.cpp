// Copyright 1998-2018 Epic Games, Inc. All Rights Reserved.

#include "ProtobufEditor.h"
#include "ProtobufEditorStyle.h"
#include "ProtobufEditorCommands.h"
#include "ThreadUtils/FProcWorkerThread.hpp"

// engine header
#include "Misc/MessageDialog.h"
#include "Framework/MultiBox/MultiBoxBuilder.h"
#include "LevelEditor.h"
#include "HAL/FileManager.h"
#include "Interfaces/IPluginManager.h"
#include "IPlatformFilePak.h"

// #include <synchapi.h>

static const FName ProtobufEditorTabName("ProtobufEditor");

#define LOCTEXT_NAMESPACE "FProtobufEditorModule"

void FProtobufEditorModule::StartupModule()
{
	// This code will execute after your module is loaded into memory; the exact timing is specified in the .uplugin file per-module
	
	FProtobufEditorStyle::Initialize();
	FProtobufEditorStyle::ReloadTextures();

	FProtobufEditorCommands::Register();
	
	PluginCommands = MakeShareable(new FUICommandList);

	PluginCommands->MapAction(
		FProtobufEditorCommands::Get().PluginAction,
		FExecuteAction::CreateRaw(this, &FProtobufEditorModule::PluginButtonClicked),
		FCanExecuteAction());
		
	FLevelEditorModule& LevelEditorModule = FModuleManager::LoadModuleChecked<FLevelEditorModule>("LevelEditor");
	
	{
		TSharedPtr<FExtender> MenuExtender = MakeShareable(new FExtender());
		MenuExtender->AddMenuExtension("WindowLayout", EExtensionHook::After, PluginCommands, FMenuExtensionDelegate::CreateRaw(this, &FProtobufEditorModule::AddMenuExtension));

		LevelEditorModule.GetMenuExtensibilityManager()->AddExtender(MenuExtender);
	}
	
	{
		TSharedPtr<FExtender> ToolbarExtender = MakeShareable(new FExtender);
		ToolbarExtender->AddToolBarExtension("Settings", EExtensionHook::After, PluginCommands, FToolBarExtensionDelegate::CreateRaw(this, &FProtobufEditorModule::AddToolbarExtension));
		
		LevelEditorModule.GetToolBarExtensibilityManager()->AddExtender(ToolbarExtender);
	}
}

void FProtobufEditorModule::ShutdownModule()
{
	// This function may be called during shutdown to clean up your module.  For modules that support dynamic reloading,
	// we call this function before unloading the module.
	FProtobufEditorStyle::Shutdown();



	FProtobufEditorCommands::Unregister();
}

void FProtobufEditorModule::PluginButtonClicked()
{
	FString ProtoPath= FPaths::GameSourceDir();
	DeleteAllProtoCodeFile(ProtoPath); 
	ExecuteProtoc(GetProtocPath(), ProtoPath);
	// RenameAllProtoCodeFiles(ProtoPath);
}

void FProtobufEditorModule::AddMenuExtension(FMenuBuilder& Builder)
{
	Builder.AddMenuEntry(FProtobufEditorCommands::Get().PluginAction);
}

void FProtobufEditorModule::AddToolbarExtension(FToolBarBuilder& Builder)
{
	Builder.AddToolBarButton(FProtobufEditorCommands::Get().PluginAction);
}


FString FProtobufEditorModule::GetProtocPath()const
{
	FString RetPath;
	FString PluginPath=IPluginManager::Get().FindPlugin(TEXT("Protobuf"))->GetBaseDir();
	PluginPath.Append(TEXT(""));
	FString ProtocExe=FPaths::Combine(PluginPath, TEXT("Source/Protobuf/ThirdParty/protobuf/bin/protoc.exe"));
	if (FPaths::FileExists(ProtocExe))
	{
		RetPath = ProtocExe;
	}
	else
	{
		RetPath = TEXT("");
	}
	return RetPath;
}


void FProtobufEditorModule::ExecuteProtoc(const FString& pProtocExe, const FString& pProtoFilePath,FString pOutPath,FString pLang,bool pWaitProcExit)
{
	TArray<FString> AllFiles;
	IFileManager::Get().FindFilesRecursive(AllFiles, *pProtoFilePath, TEXT("*.proto"),true,false,true);
	for (const auto& ProtoFile : AllFiles)
	{
		FString local_ProtoPath = ProtoFile;
		{
			int32 Pos;
			if (local_ProtoPath.FindLastChar('/', Pos))
			{
				local_ProtoPath.RemoveAt(Pos, local_ProtoPath.Len() - Pos);
			}
		}

		FString OutParams = TEXT("--") + pLang + TEXT("_out=");
		if (!pOutPath.IsEmpty()){
			OutParams.Append(TEXT("\"") + pOutPath + TEXT("\""));
		}
		else{
			OutParams.Append(TEXT("\"") + local_ProtoPath +TEXT("\""));
		}

		FString CommandParams = (TEXT("--proto_path=\"") + local_ProtoPath + TEXT("\"")) + 
								(TEXT(" \"") + ProtoFile +TEXT("\"") + TEXT(" ")) + OutParams;
		// FProcHandle ProtocProcIns=FPlatformProcess::CreateProc(*pProtocExe, *CommandParams, true, false, NULL, NULL, NULL, NULL, NULL);
		FProcWorkerThread ProtoGenWorker(*local_ProtoPath, *pProtocExe, *CommandParams);
		ProtoGenWorker.Run();
		//if (pWaitProcExit)
		//{
		//	WaitForSingleObject(ProtocProcIns.Get(), INFINITE);
		//	// CloseHandle(ProtocProcIns.Get());
		//}
		
	}
}

void FProtobufEditorModule::RenameAllProtoCodeFiles(const FString& PbCcPath)
{
	if (FPaths::DirectoryExists(PbCcPath))
	{
		TArray<FString> AllFiles;
		IFileManager::Get().FindFilesRecursive(AllFiles, *PbCcPath, TEXT("*.pb.cc"), true, false, true);
		for (const auto& File : AllFiles)
		{
			FString NewFile=File;
			{
				int32 Pos = NewFile.Find(TEXT("pb.cc"), ESearchCase::IgnoreCase, ESearchDir::FromStart);
				if (Pos != -1)
				{
					NewFile.RemoveAt(Pos, NewFile.Len() - Pos);
					NewFile.Append(TEXT("pb.cpp"));
				}
			}

			if (!NewFile.IsEmpty())
			{
				IFileManager::Get().Move(*NewFile, *File);
			}
		}
	}
}

void FProtobufEditorModule::DeleteAllProtoCodeFile(const FString& PbPath)
{
	if (FPaths::DirectoryExists(PbPath))
	{
		TArray<FString> AllProtoCodeFiles;

		auto SearchSuffixFiles = [=,&AllProtoCodeFiles](const FString& pSuffix)
		{
			IFileManager::Get().FindFilesRecursive(AllProtoCodeFiles, *PbPath, *pSuffix, true, false, false);
		};

		for (const FString& Suffix : { TEXT("*.pb.cc") ,TEXT("*.pb.h") ,TEXT("*.pb.cpp") })
		{
			SearchSuffixFiles(Suffix);
		}

		for (const auto& File : AllProtoCodeFiles)
		{
			if (FPaths::FileExists(File))
			{
				IFileManager::Get().Delete(*File, true);
			}
		}
	}
}

#undef LOCTEXT_NAMESPACE
	
IMPLEMENT_MODULE(FProtobufEditorModule, ProtobufEditor)