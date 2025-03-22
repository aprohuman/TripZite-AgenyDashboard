import React,{useState} from 'react';

import PackageDescription from './formFiledsets/PackageDescription';
import TripDuration from './formFiledsets/TripDuration';
import TripDetails from './formFiledsets/TripDetails';
import TripBreakdownForm from './formFiledsets/TripBreakdown';
import PassengerPricingForm from './formFiledsets/PassengerPricing';
import MediaUploadComponent from './formFiledsets/MediaUpload';
import FormActions from './formFiledsets/FormActions';

function PackageForm({setStepsCompleted}) {
    const [tripBreakdownCount, setTripBreakDownCount] = useState([]);

    const addPackage = (e) => { e.preventDefault(); alert('Package Added!');};

    const moveToDraft = (e) => { e.preventDefault(); alert('Packages Moved To Draft!');};
    
    return (
        <form className='flex flex-col'>
            <PackageDescription setStepsCompleted={setStepsCompleted} />
            <TripDuration setStepsCompleted={setStepsCompleted} />
            <TripDetails setTripBreakDownCount={setTripBreakDownCount} />
            <TripBreakdownForm tripBreakdownCount={tripBreakdownCount} />
            <PassengerPricingForm setStepsCompleted={setStepsCompleted} />
            <MediaUploadComponent setStepsCompleted={setStepsCompleted} />
            <FormActions addPackage={addPackage} moveToDraft={moveToDraft} />
        </form>
    )
}

export default PackageForm;