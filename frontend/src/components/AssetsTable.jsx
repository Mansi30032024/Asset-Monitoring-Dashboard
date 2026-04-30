function AssetsTable({ assets, onDeleteAsset, onEditAsset, onStatusChange }) {
  return (
    <section className="table-section">
      <div className="panel-heading">
        <h2>Assets</h2>
        <span>Auto refresh every 5 seconds</span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Temp</th>
              <th>Pressure</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td>{asset.assetName}</td>
                <td>{asset.assetType}</td>
                <td>{asset.location}</td>
                <td>
                  <select
                    className={`status ${asset.status}`}
                    value={asset.status}
                    onChange={(event) => onStatusChange(asset._id, event.target.value)}
                  >
                    <option value="active">active</option>
                    <option value="inactive">inactive</option>
                    <option value="maintenance">maintenance</option>
                  </select>
                </td>
                <td>{asset.temperature} C</td>
                <td>{asset.pressure} PSI</td>
                <td className="actions">
                  <button onClick={() => onEditAsset(asset)}>Edit</button>
                  <button onClick={() => onDeleteAsset(asset._id)}>Delete</button>
                </td>
              </tr>
            ))}
            {assets.length === 0 && (
              <tr>
                <td colSpan="7" className="empty">
                  No assets added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AssetsTable
