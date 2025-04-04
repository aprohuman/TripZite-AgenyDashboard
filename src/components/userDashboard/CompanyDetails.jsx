const CompanyDetails = ({ company }) => {
  return (
    <section className="company-details">
      <h3>Registered Company Details</h3>
      <p>
        <strong>Name:</strong> {company.name}
      </p>
      <p>
        <strong>Email:</strong> {company.email}
      </p>
      <p>
        <strong>Mobile:</strong> {company.mobile}
      </p>
      <p>
        <strong>Address:</strong> {company.address}
      </p>
    </section>
  )
}
export default CompanyDetails
