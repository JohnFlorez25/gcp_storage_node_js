'use strict'

//1. Identificar credenciales de acceso
// NOMBRE DEL PROJECTO
const GOOGLE_CLOUD_PROJECT = '';
// NOMBRE DEL BUCKET
const GOOGLE_CLOUD_BUCKET = '';
const GOOGLE_CLOUD_BUCKET_2 = '';
// NOMBRE DEL NUEVO BUCKET

//2. Identificar Origen y Destino de la imagen
//ORIGEN DE LA IMAGEN
const FILE_NAME = './images/kitten.png'
// DESTINO DE LA IMAGEN (EN EL BUCKET)
const DESTINATION_FILE = 'kitten.png'

//Importar la librera de Cloud Storage
const { Storage } = require('@google-cloud/storage');

//3. CREAR EL CLIENTE DE CONEXION CON CLOUD STORAGE
const storage = new Storage({
    projectId : GOOGLE_CLOUD_PROJECT,
    //SE DEBE GENERAR DESDE EL SERVICIO DE IAM PARA PODER ACCERDER AL CONTROL DEL BUCKET
    keyFilename : './key.json'
    }
);

//4. SUBIR UNA IMAGEN A MI BUCKET EN GCP
async function uploadFile() {
    await storage.bucket(GOOGLE_CLOUD_BUCKET).upload(FILE_NAME, {
      destination: DESTINATION_FILE,
    });
  
    console.log(`${FILE_NAME} uploaded to ${GOOGLE_CLOUD_BUCKET}`);
  }
  
  //uploadFile().catch(console.error);

  //CREAR UN BUCKET
  async function createBucket() {
    // Creates a new bucket in the Asia region with the coldline default storage
    // class. Leave the second argument blank for default settings.
    //
    // For default values see: https://cloud.google.com/storage/docs/locations and
    // https://cloud.google.com/storage/docs/storage-classes
  
    const [bucket] = await storage.createBucket(GOOGLE_CLOUD_BUCKET_2, {
      location: 'ASIA',
      storageClass: 'COLDLINE',
    });
  
    console.log(`Bucket ${bucket.name} created.`);
  }
  
//createBucket().catch(console.error);

//BORRANDO UN BUCKET
  async function deleteBucket() {
    await storage.bucket(GOOGLE_CLOUD_BUCKET_2).delete();
    console.log(`Bucket ${GOOGLE_CLOUD_BUCKET_2} deleted`);
  }
  
  deleteBucket().catch(console.error);