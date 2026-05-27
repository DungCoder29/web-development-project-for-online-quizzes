import { useMemo, useState } from 'react';

export default function Admin() {
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const users = [
    { id: 1, name: 'Nguyễn Văn A', email: 'a@stu.vn' },
    { id: 2, name: 'Trần Thị B', email: 'b@stu.vn' },
    { id: 3, name: 'Lê Văn C', email: 'c@stu.vn' },
    { id: 4, name: 'Phạm Thị D', email: 'd@stu.vn' },
  ];

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    return users
      .filter((user) => {
        if (!term) return true;
        return (
          user.name.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term)
        );
      })
      .sort((a, b) => {
        const aValue = a[sortField].toString().toLowerCase();
        const bValue = b[sortField].toString().toLowerCase();
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
  }, [search, sortField, sortOrder]);

  return (
    <div className="container py-4">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-3 mb-4">
        <div>
          <h2 className="mb-1">Admin - Danh sách người dùng</h2>
          <p className="text-muted mb-0">Tìm kiếm và sắp xếp danh sách user.</p>
        </div>
        <div className="d-flex gap-2 flex-column flex-sm-row w-100 w-md-auto">
          <input
            type="search"
            className="form-control"
            value={search}
            placeholder="Tìm tên hoặc email..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <select className="form-select" value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="name">Sắp xếp theo tên</option>
            <option value="email">Sắp xếp theo email</option>
          </select>
          <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>#</th>
              <th>Tên</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center py-4">
                  Không tìm thấy người dùng.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
