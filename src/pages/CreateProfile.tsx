import {CloudStorage} from "@tma.js/sdk-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
function CreateProfile({ cloudStorageProp }) {
  const cloudStorage = cloudStorageProp as CloudStorage;
  // const cloudStorage: CloudStorage = cloudStorageAny;
  function chStage(step: number) {
    console.log(step);
    console.log(cloudStorage);

    cloudStorage.getValues(['stage'])
      .then((result) => {
        console.log(result);
        if ('stage' in result) {
          const newStage = Number.parseInt(result['stage']) + step;
          cloudStorage.saveValue('stage', newStage.toString());
        } else {
          console.log('stage is not in storage, set it to 0');
          cloudStorage.saveValue('stage', '0');
        }
      });
  }
  return (
    <div>
      <h1>Create Profile</h1>
      <button onClick={() => chStage(1) }>
        Increase stage
      </button>
      <button onClick={() => chStage(-1) }>
        Decrease stage
      </button>
    </div>
  )
}

export default CreateProfile;