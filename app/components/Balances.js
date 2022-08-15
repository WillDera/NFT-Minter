const Balances = () => {
  return (
    <div className="flex flex-wrap mx-3 mb-2 pt-4">
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <h3 className="pb-3">Balances</h3>
        <table className="table-auto w-full max-w-sm">
          <thead>
            <tr>
              <th>Token ID</th>
              <th>Token Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dummy ID</td>
              <td>Dummy ID</td>
              <td>Dummy ID</td>
            </tr>
            <tr>
              <td>Dummy Name</td>
              <td>Dummy Name</td>
              <td>Dummy Name</td>
            </tr>
            <tr>
              <td>Dummy Amount</td>
              <td>Dummy Amount</td>
              <td>Dummy Amount</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Balances;
