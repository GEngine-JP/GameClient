using System;
using UnityEngine;

[System.Serializable]
public class SerializableGuid
{
    [SerializeField]
	public byte [] m_GuidBytes;
	
	public SerializableGuid()
	{
	    m_GuidBytes = new byte[16];
	}
	
	public SerializableGuid(Guid guid)
	{
		m_GuidBytes = guid.ToByteArray();
	}

    public SerializableGuid(string guid):this(new Guid(guid))
    {         
    }
	
	public static SerializableGuid NewGuid()
	{
		SerializableGuid guid = new SerializableGuid(Guid.NewGuid());
		return guid;
	}

    public string GetString()
    {
        return string.Format("{3}{2}{1}{0}-{5}{4}-{7}{6}-{8}{9}-{10}{11}{12}{13}{14}{15}", m_GuidBytes[0].ToString("x2"),
            m_GuidBytes[1].ToString("x2"), m_GuidBytes[2].ToString("x2"),
            m_GuidBytes[3].ToString("x2"), m_GuidBytes[4].ToString("x2"),
            m_GuidBytes[5].ToString("x2"), m_GuidBytes[6].ToString("x2"),
            m_GuidBytes[7].ToString("x2"), m_GuidBytes[8].ToString("x2"),
            m_GuidBytes[9].ToString("x2"), m_GuidBytes[10].ToString("x2"),
            m_GuidBytes[11].ToString("x2"), m_GuidBytes[12].ToString("x2"),
            m_GuidBytes[13].ToString("x2"), m_GuidBytes[14].ToString("x2"),
            m_GuidBytes[15].ToString("x2"));
    }

	public override int GetHashCode ()
	{
        int result = 0;
        foreach (byte b in m_GuidBytes)
            result = (result * 31) ^ b;
        return result;
	}
	
	public override bool Equals (object obj)
	{
		if (!(obj is SerializableGuid))
			return false;
	    SerializableGuid otherGuid = obj as SerializableGuid;
        for (int i = 0; i < m_GuidBytes.Length; ++i)
        {
            if (m_GuidBytes[i] != otherGuid.m_GuidBytes[i])
                return false;
        }
	    return true;
	}
	
	public override string ToString ()
	{
		return GetString();
	}
}

