class PlayerData {
    public static readonly Instance: PlayerData = new PlayerData();

    public constructor() {
    }

    public uid: Long;
    public randomName: string;
}