import { useEffect, useState, useMemo } from 'react';
import api from './api';

const API_URL = '/v1/users';
const PAGE_SIZE = 8;
const AVATAR_COLORS = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626', '#0891b2'];

// ── Modal thêm / sửa user ──────────────────────────────────────────────────
function UserFormModal({ mode, user, onClose, onSave }) {
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [studentId, setStudentId] = useState(user?.student_id || '');
  const [err, setErr] = useState('');

  const handleSave = () => {
    if (!name.trim() || !phone.trim()) {
      setErr('Vui lòng nhập đầy đủ họ tên và số điện thoại.');
      return;
    }
    onSave({ name: name.trim(), phone: phone.trim(), student_id: studentId.trim().toUpperCase() });
  };

  return (
    <div className="adc-modal-backdrop" onClick={onClose}>
      <div className="adc-modal" onClick={(e) => e.stopPropagation()}>
        <div className="adc-modal__header">
          <h3>{mode === 'add' ? '➕ Thêm người dùng mới' : '✏️ Chỉnh sửa người dùng'}</h3>
          <button className="adc-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="adc-modal__body">
          {err && <div className="adc-alert adc-alert--danger">{err}</div>}
          <div className="adc-form-field">
            <label>Họ và tên</label>
            <input
              className="adc-input"
              placeholder="Nhập họ và tên..."
              value={name}
              onChange={(e) => { setName(e.target.value); setErr(''); }}
            />
          </div>
          <div className="adc-form-field">
            <label>MSSV (Không bắt buộc)</label>
            <input
              className="adc-input"
              placeholder="Ví dụ: DH52109876..."
              value={studentId}
              onChange={(e) => { setStudentId(e.target.value); setErr(''); }}
            />
          </div>
          <div className="adc-form-field">
            <label>Số điện thoại</label>
            <input
              className="adc-input"
              placeholder="Nhập số điện thoại..."
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setErr(''); }}
            />
          </div>
        </div>
        <div className="adc-modal__footer">
          <button className="adc-btn adc-btn--ghost" onClick={onClose}>Hủy</button>
          <button className="adc-btn adc-btn--primary" onClick={handleSave}>
            {mode === 'add' ? 'Thêm mới' : 'Lưu thay đổi'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Modal xác nhận xóa ─────────────────────────────────────────────────────
function ConfirmModal({ user, onClose, onConfirm }) {
  return (
    <div className="adc-modal-backdrop" onClick={onClose}>
      <div className="adc-modal adc-modal--sm" onClick={(e) => e.stopPropagation()}>
        <div className="adc-modal__header">
          <h3>🗑️ Xác nhận xóa</h3>
          <button className="adc-modal__close" onClick={onClose}>✕</button>
        </div>
        <div className="adc-modal__body">
          <p style={{ margin: 0 }}>
            Bạn có chắc chắn muốn xóa người dùng{' '}
            <strong>{user.name}</strong>?
          </p>
          <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '0.9rem' }}>
            Hành động này không thể hoàn tác.
          </p>
        </div>
        <div className="adc-modal__footer">
          <button className="adc-btn adc-btn--ghost" onClick={onClose}>Hủy</button>
          <button className="adc-btn adc-btn--danger" onClick={onConfirm}>Xóa</button>
        </div>
      </div>
    </div>
  );
}

// ── Component chính ────────────────────────────────────────────────────────
function UserList() {
  const [users, setUsers]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage]             = useState(1);
  const [toast, setToast]           = useState('');

  // Modal states
  const [formModal, setFormModal]     = useState(null); // null | { mode: 'add'|'edit', user? }
  const [confirmDel, setConfirmDel]   = useState(null); // null | user object

  const fetchUsers = () => {
    api.get(API_URL)
      .then((res) => {
        setUsers(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  // Tải dữ liệu từ API
  useEffect(() => {
    fetchUsers();
  }, []);

  // Toast tự ẩn sau 3s
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Lọc + phân trang
  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        (u.name || '').toLowerCase().includes(term) ||
        (u.phone || '').toLowerCase().includes(term) ||
        (u.student_id || '').toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Handlers
  const handleSearch = (val) => { setSearchTerm(val); setPage(1); };

  const handleAdd = () => setFormModal({ mode: 'add' });

  const handleEdit = (user) => setFormModal({ mode: 'edit', user });

  const handleDelete = (user) => setConfirmDel(user);

  const handleSaveForm = ({ name, phone, student_id }) => {
    if (formModal.mode === 'add') {
      api.post(API_URL, { name, phone, student_id })
        .then(() => {
          setToast('✅ Đã thêm người dùng mới thành công!');
          fetchUsers();
        })
        .catch((err) => {
          console.error(err);
          setToast('❌ Thêm người dùng thất bại.');
        });
    } else {
      api.put(`${API_URL}/${formModal.user.id}`, { name, phone, student_id })
        .then(() => {
          setToast('✅ Đã cập nhật thông tin người dùng!');
          fetchUsers();
        })
        .catch((err) => {
          console.error(err);
          setToast('❌ Cập nhật người dùng thất bại.');
        });
    }
    setFormModal(null);
  };

  const handleConfirmDelete = () => {
    api.delete(`${API_URL}/${confirmDel.id}`)
      .then(() => {
        setToast(`🗑️ Đã xóa người dùng "${confirmDel.name}".`);
        fetchUsers();
      })
      .catch((err) => {
        console.error(err);
        setToast('❌ Xóa người dùng thất bại.');
      });
    setConfirmDel(null);
  };

  if (loading) {
    return (
      <div className="adc-loading">
        <div className="adc-spinner" />
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <div className="adc-page">
      {/* Toast */}
      {toast && <div className="adc-toast">{toast}</div>}

      {/* Modals */}
      {formModal && (
        <UserFormModal
          mode={formModal.mode}
          user={formModal.user}
          onClose={() => setFormModal(null)}
          onSave={handleSaveForm}
        />
      )}
      {confirmDel && (
        <ConfirmModal
          user={confirmDel}
          onClose={() => setConfirmDel(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Page Header */}
      <div className="adc-page-header">
        <div>
          <h1 className="adc-page-title">👥 Quản lý người dùng</h1>
          <p className="adc-page-desc">Tổng cộng {users.length} tài khoản trong hệ thống</p>
        </div>
        <button className="adc-btn adc-btn--primary" onClick={handleAdd}>
          + Thêm người dùng
        </button>
      </div>

      {/* Card */}
      <div className="adc-card">
        {/* Search bar */}
        <div className="adc-toolbar">
          <div className="adc-search-wrap">
            <span className="adc-search-icon">🔍</span>
            <input
              className="adc-search-input"
              placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {searchTerm && (
              <button className="adc-search-clear" onClick={() => handleSearch('')}>✕</button>
            )}
          </div>
          <span className="adc-toolbar__count">
            {filtered.length} kết quả
          </span>
        </div>

        {/* Table */}
        <div className="adc-table-wrap">
          <table className="adc-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Người dùng</th>
                <th>MSSV</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th className="text-end">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={6} className="adc-table__empty">
                    {searchTerm ? 'Không tìm thấy người dùng phù hợp.' : 'Chưa có dữ liệu.'}
                  </td>
                </tr>
              ) : (
                paginated.map((user, idx) => (
                  <tr key={user.id} className="adc-table__row">
                    <td className="adc-table__id">#{user.id}</td>
                    <td>
                      <div className="adc-user-cell">
                        <div
                          className="adc-avatar-sm"
                          style={{ background: AVATAR_COLORS[(idx) % AVATAR_COLORS.length] }}
                        >
                          {user.name ? user.name[0].toUpperCase() : '?'}
                        </div>
                        <span className="adc-user-cell__name">{user.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="adc-chip adc-chip--gray">{user.student_id || 'N/A'}</span>
                    </td>
                    <td>
                      <span className="adc-chip adc-chip--blue">{user.phone}</span>
                    </td>
                    <td>
                      <span className="adc-chip adc-chip--green">● Hoạt động</span>
                    </td>
                    <td className="text-end">
                      <button
                        className="adc-btn adc-btn--sm adc-btn--outline-blue me-2"
                        onClick={() => handleEdit(user)}
                      >
                        ✏️ Sửa
                      </button>
                      <button
                        className="adc-btn adc-btn--sm adc-btn--outline-red"
                        onClick={() => handleDelete(user)}
                      >
                        🗑️ Xóa
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="adc-pagination">
          <span className="adc-pagination__info">
            Trang {page} / {totalPages} &nbsp;·&nbsp; {filtered.length} người dùng
          </span>
          <div className="adc-pagination__btns">
            <button
              className="adc-btn adc-btn--sm adc-btn--ghost"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ‹ Trước
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
              .reduce((acc, p, i, arr) => {
                if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === '...' ? (
                  <span key={`dot-${i}`} className="adc-pagination__dots">…</span>
                ) : (
                  <button
                    key={p}
                    className={`adc-btn adc-btn--sm${page === p ? ' adc-btn--primary' : ' adc-btn--ghost'}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              className="adc-btn adc-btn--sm adc-btn--ghost"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Tiếp ›
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserList;