### What is this?

This is an Unreal Engine 4 plugin that integrates [Protobuf](https://github.com/protocolbuffers/protobuf) into the project without requiring you to add system PATH or anything else.

### How do use?

1. add the plugin to the project and enable it.
2. add the following property to `build.cs` of the project :

```csharp
PublicDependencyModuleNames.Add("Protobuf");
bEnableUndefinedIdentifierWarnings = false;
bEnableExceptions = true;
```

4. Create `.proto` file into project source code folder 
5. Launch the Project in Editor, Click the `Protoc` button.

### Protobuf Version

- Protobuf v3.5.1

