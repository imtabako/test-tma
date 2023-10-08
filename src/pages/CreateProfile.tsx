import {useCloudStorage} from "@tma.js/sdk-react";

function CreateProfile() {
  const cloudStorage = useCloudStorage();

  function chStage(step: number) {
    cloudStorage.getValues(['stage'])
      .then((result) => {
        console.log(result);
        // first time
        if (result['stage'] === '') {
          console.log('stage is not in storage, set it to 0');
          cloudStorage.saveValue('stage', '0');
        } else {
          const newStage = Number.parseInt(result['stage']) + step;
          cloudStorage.saveValue('stage', newStage.toString());
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