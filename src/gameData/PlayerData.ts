class PlayerData {
    public static readonly getInstance: PlayerData = new PlayerData();

    public constructor() {
    }

    public uid: Long;
    public randomName: string;
}