import { useCallback, useEffect, useState } from 'react'
import {
  changeAssetStatus,
  deleteAssetById,
  getAssetCounts,
  getAssets,
  saveAsset
} from '../services/api'
import { emptyAsset } from '../config/assets'
import AssetForm from './AssetForm'
import AssetsTable from './AssetsTable'
import MessageBanner from './MessageBanner'
import StatsGrid from './StatsGrid'
import Topbar from './Topbar'

function Dashboard({ token, onLogout }) {
  const [assets, setAssets] = useState([])
  const [counts, setCounts] = useState({
    totalAssets: 0,
    activeAssets: 0,
    inactiveAssets: 0,
    maintenanceAssets: 0
  })
  const [formData, setFormData] = useState(emptyAsset)
  const [editId, setEditId] = useState('')
  const [message, setMessage] = useState('')

  const loadDashboard = useCallback(async () => {
    try {
      const [assetResponse, countResponse] = await Promise.all([
        getAssets(),
        getAssetCounts()
      ])

      setAssets(assetResponse.data)
      setCounts(countResponse.data)
    } catch (err) {
      setMessage(err.response?.data?.error || 'Unable to load dashboard data')
    }
  }, [])

  useEffect(() => {
    const refreshDashboard = () => {
      Promise.resolve().then(loadDashboard)
    }

    refreshDashboard()
    const interval = setInterval(loadDashboard, 5000)

    return () => clearInterval(interval)
  }, [loadDashboard])

  const handleAssetChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  const handleAssetSubmit = async (event) => {
    event.preventDefault()

    try {
      await saveAsset({
        asset: formData,
        assetId: editId,
        token
      })

      setMessage(editId ? 'Asset updated successfully' : 'Asset added successfully')
      setFormData(emptyAsset)
      setEditId('')
      loadDashboard()
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data?.error || 'Server not responding')
    }
  }

  const handleEditAsset = (asset) => {
    setEditId(asset._id)
    setFormData({
      assetName: asset.assetName,
      assetType: asset.assetType,
      location: asset.location,
      status: asset.status,
      temperature: asset.temperature,
      pressure: asset.pressure,
      lastServiceDate: asset.lastServiceDate ? asset.lastServiceDate.slice(0, 10) : ''
    })
  }

  const handleDeleteAsset = async (assetId) => {
    try {
      await deleteAssetById(assetId, token)
      setMessage('Asset deleted successfully')
      loadDashboard()
    } catch (err) {
      setMessage(err.response?.data?.message || err.response?.data?.error || 'Server not responding')
    }
  }

  const handleStatusChange = async (assetId, status) => {
    try {
      await changeAssetStatus({ assetId, status, token })
      setMessage('Status updated')
      loadDashboard()
    } catch (err) {
      setMessage(err.response?.data?.error || 'Server not responding')
    }
  }

  const handleCancelEdit = () => {
    setEditId('')
    setFormData(emptyAsset)
  }

  return (
    <main className="dashboard">
      <Topbar onLogout={onLogout} />

      <StatsGrid counts={counts} />
      <MessageBanner message={message} />

      <section className="main-grid single-column">
        <AssetForm
          editId={editId}
          formData={formData}
          onCancelEdit={handleCancelEdit}
          onChange={handleAssetChange}
          onSubmit={handleAssetSubmit}
        />
      </section>

      <AssetsTable
        assets={assets}
        onDeleteAsset={handleDeleteAsset}
        onEditAsset={handleEditAsset}
        onStatusChange={handleStatusChange}
      />
    </main>
  )
}

export default Dashboard
