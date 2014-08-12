using UnityEngine;
using System.Collections;
using System.IO;

public class Sky : MonoBehaviour 
{
	const float SCALE = 1000.0f;
	
	const int TRANSMITTANCE_WIDTH = 256;
	const int TRANSMITTANCE_HEIGHT = 64;
	const int TRANSMITTANCE_CHANNELS = 3;
	
	const int INSCATTER_WIDTH = 256;
	const int INSCATTER_HEIGHT = 128;
	const int INSCATTER_DEPTH = 32;
	const int INSCATTER_CHANNELS = 4;
	
	public Material m_skyMapMaterial;
	public Material m_skyMaterial;
	public GameObject m_sun;
	public RenderTexture m_skyMap;
	public Vector3 m_betaR = new Vector3(0.0058f, 0.0135f, 0.0331f);
	public float m_mieG = 0.75f;
	public float m_sunIntensity = 100.0f;
	
	private RenderTexture m_transmittance, m_inscatter;
	int m_frameCount = 0, m_pauseCount = 0;

	void Start () 
	{

		m_skyMap.format = RenderTextureFormat.ARGBHalf; //must be floating point format

		m_transmittance = new RenderTexture(TRANSMITTANCE_WIDTH, TRANSMITTANCE_HEIGHT, 0, RenderTextureFormat.ARGBHalf);
		m_transmittance.wrapMode = TextureWrapMode.Clamp;
		m_transmittance.filterMode = FilterMode.Bilinear;
		m_transmittance.Create();

		m_inscatter = new RenderTexture(INSCATTER_WIDTH, INSCATTER_HEIGHT*INSCATTER_DEPTH, 0, RenderTextureFormat.ARGBHalf);
		m_inscatter.wrapMode = TextureWrapMode.Clamp;
		m_inscatter.filterMode = FilterMode.Bilinear;
		m_inscatter.Create();

	}
	
	public bool IsCreated()
	{
		//Sometimes Unity will mark render textures as not created when they have been
		//This will check for that. These textures are the important ones.
		if(!m_transmittance.IsCreated()) return false;
		if(!m_inscatter.IsCreated()) return false;
		if(!m_skyMap.IsCreated()) return false;
		
		return true;
	}
	
	public void Init()
	{
		
		//Transmittance is responsible for the change in the sun color as it moves
		//The raw file is a 2D array of 32 bit floats with a range of 0 to 1
		string path = Application.dataPath + "/Textures/transmittance.raw";
		
		//This function loads the raw file, encodes each channel into a 2D texture
		//and then decodes each channel into a 2D render texture using Graphics.Blit(). 
		EncodeFloat.WriteIntoRenderTexture(m_transmittance, TRANSMITTANCE_CHANNELS, path);
		
		//Inscatter is responsible for the change in the sky color as the sun moves
		//The raw file is a 4D array of 32 bit floats with a range of 0 to 1.589844
		//As there is not such thing as a 4D texture the data is packed into a 2D texture 
		//and the shader manually performs the sample for the 3rd and 4th dimension
		path = Application.dataPath + "/Textures/inscatter.raw";
		
		EncodeFloat.WriteIntoRenderTexture(m_inscatter, INSCATTER_CHANNELS, path);
		
		InitMaterial(m_skyMapMaterial);
		InitMaterial(m_skyMaterial);
	
	}
	
	void Update () 
	{
		
		//These are work arounds for some bugs in Unity 4.0 - 4.2. If your running this in a later version they may have been fixed??
		//In a Unity dx9 build graphics blit does not seam to have any effect on the first frame.
		//The sky object uses graphics blit to initilize some render textures.
		//Call init() to do this but it must be called on the second frame. Strange.
		//This does not seem to be needed in a dx11 build
		//On certain events in Unity, like moving the window or minimizing Unity will
		//mark render textures as not created for some reason. If this happens recreate required textures
		//When the window is pause by minimizing it the render textures are also cleared but recreating
		//them only works on around frame 5. Very Strange.
		if(m_frameCount == 1 || (m_pauseCount == 5 && m_frameCount != 5))
			Init();
		
		if(!IsCreated())
		{
			Init();
			m_pauseCount = 0;	
		}
		
		m_frameCount++;
		m_pauseCount++;
		
		Vector3 pos = Camera.main.transform.position;
		pos.y = 0.0f;
		//centre sky dome at player pos
		transform.localPosition = pos;
		
		UpdateMat(m_skyMapMaterial);
		UpdateMat(m_skyMaterial);

		Graphics.Blit(null, m_skyMap, m_skyMapMaterial);
	}
	
	void UpdateMat(Material mat)
	{	
		mat.SetVector("betaR", m_betaR / SCALE);
		mat.SetFloat("mieG", m_mieG);
		mat.SetVector("SUN_DIR", m_sun.transform.forward*-1.0f);
		mat.SetFloat("SUN_INTENSITY", m_sunIntensity);
	}
	
	void InitMaterial(Material mat)
	{
		
		mat.SetTexture("_Transmittance", m_transmittance);
		mat.SetTexture("_Inscatter", m_inscatter);

		mat.SetFloat("SUN_INTENSITY", m_sunIntensity);
		mat.SetVector("SUN_DIR", m_sun.transform.forward*-1.0f);
		
		//Dont change this
		mat.SetVector("EARTH_POS", new Vector3(0.0f, 6360010.0f, 0.0f));
		
	}
	
	void OnApplicationPause(bool focusPause)
	{
		m_pauseCount = 0;	
	}
	
	void OnDestroy()
	{
		m_transmittance.Release();
		m_inscatter.Release();
	}
	
}

