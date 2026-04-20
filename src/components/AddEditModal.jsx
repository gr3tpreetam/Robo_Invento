// src/components/AddEditModal.jsx
import { useState, useEffect, useRef } from 'react';
import { XMarkIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/outline';

const CATEGORIES = [
  'Microcontrollers','Motor Drivers','Sensors','Power Management',
  'Linear Regulators','Passives','Connectors','Displays',
  'Communication Modules','Transistors','ICs','Other',
];

const EMPTY_FORM = { name:'', partNumber:'', manufacturer:'', category:'Other', quantity:1, location:'', notes:'', datasheetUrl:'', imageUrl:'' };

export default function AddEditModal({ isOpen, onClose, onSave, editItem = null }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (editItem) {
      setForm({ name: editItem.name??'', partNumber: editItem.partNumber??'', manufacturer: editItem.manufacturer??'',
        category: editItem.category??'Other', quantity: editItem.quantity??1, location: editItem.location??'',
        notes: editItem.notes??'', datasheetUrl: editItem.datasheetUrl??'', imageUrl: editItem.imageUrl??'' });
    } else {
      setForm(EMPTY_FORM);
    }
    setErrors({});
  }, [editItem, isOpen]);

  useEffect(() => {
    if (isOpen) setTimeout(() => firstInputRef.current?.focus(), 100);
  }, [isOpen]);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Component name is required';
    if (form.quantity < 0) e.quantity = 'Quantity cannot be negative';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try { await onSave({ ...form, quantity: Number(form.quantity) }); onClose(); }
    catch (err) { console.error(err); }
    finally { setSaving(false); }
  }

  if (!isOpen) return null;

  const fieldStyle = { display: 'grid', gap: '0.25rem' };
  const inputStyle = (err) => ({ ...{}, border: err ? '1px solid rgba(239,68,68,0.5)' : undefined });

  return (
    <div className="animate-fade-in" style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} onClick={onClose} />

      <div className="glass-card animate-slide-in" style={{ position: 'relative', width: '100%', maxWidth: '32rem', maxHeight: '90vh', overflowY: 'auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
            <div style={{ padding: '0.5rem', borderRadius: '0.75rem', background: 'rgba(34,211,238,0.1)', display: 'flex' }}>
              {editItem ? <PencilIcon style={{ width: '1rem', height: '1rem', color: '#22d3ee' }} /> : <PlusIcon style={{ width: '1rem', height: '1rem', color: '#22d3ee' }} />}
            </div>
            <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'white' }}>{editItem ? 'Edit Component' : 'Add Component'}</h2>
          </div>
          <button onClick={onClose} style={{ padding: '0.375rem', borderRadius: '0.5rem', color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
            <XMarkIcon style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={fieldStyle}>
            <label className="label">Component Name *</label>
            <input ref={firstInputRef} id="input-name" name="name" value={form.name} onChange={handleChange} className="input-field" placeholder="e.g. L298N Motor Driver" style={inputStyle(errors.name)} />
            {errors.name && <p style={{ fontSize: '0.75rem', color: '#f87171' }}>{errors.name}</p>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={fieldStyle}>
              <label className="label">Part Number</label>
              <input id="input-partNumber" name="partNumber" value={form.partNumber} onChange={handleChange} className="input-field" placeholder="L298N" />
            </div>
            <div style={fieldStyle}>
              <label className="label">Manufacturer</label>
              <input id="input-manufacturer" name="manufacturer" value={form.manufacturer} onChange={handleChange} className="input-field" placeholder="STMicroelectronics" />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={fieldStyle}>
              <label className="label">Category</label>
              <select id="input-category" name="category" value={form.category} onChange={handleChange} className="input-field">
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div style={fieldStyle}>
              <label className="label">Quantity *</label>
              <input id="input-quantity" name="quantity" type="number" min="0" value={form.quantity} onChange={handleChange} className="input-field" style={inputStyle(errors.quantity)} />
              {errors.quantity && <p style={{ fontSize: '0.75rem', color: '#f87171' }}>{errors.quantity}</p>}
            </div>
          </div>

          <div style={fieldStyle}>
            <label className="label">Storage Location</label>
            <input id="input-location" name="location" value={form.location} onChange={handleChange} className="input-field" placeholder="e.g. Drawer A2, Box B1" />
          </div>

          <div style={fieldStyle}>
            <label className="label">Notes</label>
            <textarea id="input-notes" name="notes" value={form.notes} onChange={handleChange} className="input-field" rows={2} placeholder="Any additional notes..." style={{ resize: 'none' }} />
          </div>

          <div style={fieldStyle}>
            <label className="label">Datasheet URL</label>
            <input id="input-datasheetUrl" name="datasheetUrl" type="url" value={form.datasheetUrl} onChange={handleChange} className="input-field" placeholder="https://..." />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '0.5rem' }}>
            <button type="button" onClick={onClose} className="btn-secondary">Cancel</button>
            <button type="submit" id="modal-save-btn" disabled={saving} className="btn-primary">
              {saving ? 'Saving...' : editItem ? 'Save Changes' : 'Add Component'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
