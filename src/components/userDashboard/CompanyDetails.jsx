const CompanyDetails = ({ company }) => {
  return (
    <section className="pt-[21px] pb-[21px]">
      <h3 className="text-[24px] font-[400]"> Registered Company Details</h3>
      <p className="text=[11px]">
        *Registered company details will be used for official <br />{' '}
        communication between Tripzite, travellers and the agency.
      </p>

      <div className="flex  gap-50 mt-4">
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[20px] text-[#5FA49F]">NAME</h3>
            <p className="text-[20px] font-[400]">{company.name}</p>
          </div>

          <div>
            <h3 className="text-[20px] text-[#5FA49F]">E-MAIL ID</h3>
            <p className="text-[20px] font-[400]">{company.email}</p>
          </div>
        </div>

        {/* right-side */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-[20px] text-[#5FA49F]">ADDRESS</h3>
            <p className="text-[20px] font-[400]">{company.address}</p>
          </div>

          <div>
            <h3 className="text-[20px] text-[#5FA49F]">MOBILE NO.</h3>
            <p className="text-[20px] font-[400]">{company.mobile}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
export default CompanyDetails
