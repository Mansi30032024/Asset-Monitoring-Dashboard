import { assetTypes, statuses } from '../config/assets'

function AssetForm({ editId, formData, onCancelEdit, onChange, onSubmit }) {
  return (
    <div className="panel">
      <div className="panel-heading">
        <h2>{editId ? 'Update Asset' : 'Add Asset'}</h2>
        {editId && <button onClick={onCancelEdit}>Cancel</button>}
      </div>

      <form onSubmit={onSubmit} className="form asset-form">
        <label>
          Asset Name
          <input
            type="text"
            name="assetName"
            value={formData.assetName}
            onChange={onChange}
            placeholder="Asset 01"
            required
          />
        </label>

        <label>
          Asset Type
          <select name="assetType" value={formData.assetType} onChange={onChange}>
            {assetTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label>
          Location
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={onChange}
            placeholder="Facility A - Zone 1"
            required
          />
        </label>

        <label>
          Status
          <select name="status" value={formData.status} onChange={onChange}>
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          Temperature
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={onChange}
            placeholder="72"
          />
        </label>

        <label>
          Pressure
          <input
            type="number"
            name="pressure"
            value={formData.pressure}
            onChange={onChange}
            placeholder="30"
          />
        </label>

        <label>
          Last Service Date
          <input
            type="date"
            name="lastServiceDate"
            value={formData.lastServiceDate}
            onChange={onChange}
          />
        </label>

        <button className="primary-btn" type="submit">
          {editId ? 'Update Asset' : 'Add Asset'}
        </button>
      </form>
    </div>
  )
}

export default AssetForm

//asset