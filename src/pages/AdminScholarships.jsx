
function AdminScholarships() {
    const [scholarships, setScholarships] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ name: '', amount: '', deadline: '', status: 'Active' });

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const res = await axios.get(apiUrl('/api/scholarships/admin'));
                if (Array.isArray(res.data)) {
                    setScholarships(res.data);
                } else if (res.data && Array.isArray(res.data.scholarships)) {
                    setScholarships(res.data.scholarships);
                } else {
                    setScholarships([]);
                }
            } catch (err) {
                setScholarships([]);
            }
        };
        fetchScholarships();
    }, []);

    const handleEdit = (sch) => {
        setEditingId(sch.id);
        setForm({ ...sch });
    };

    const handleSave = (id) => {
        setScholarships((prev) =>
            prev.map((sch) =>
                sch.id === id ? { ...form, id } : sch
            )
        );
        setEditingId(null);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(apiUrl(`/api/scholarships/${id}`));
            setScholarships((prev) => prev.filter((sch) => sch._id !== id && sch.id !== id));
        } catch (err) {
            alert('Failed to delete scholarship!');
        }
    };

    const handleAdd = async () => {
        try {
            const res = await axios.post(apiUrl('/api/scholarships'), form);
            setScholarships((prev) => [...prev, res.data]);
            setForm({ name: '', amount: '', deadline: '', status: 'Active' });
        } catch (err) {
            alert('Failed to add scholarship!');
        }
    };

    const isScholarshipsArray = Array.isArray(scholarships);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Manage Scholarships</h2>
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Add New Scholarship</h3>
                <div className="flex flex-wrap gap-2">
                    <input
                        className="input input-bordered input-sm"
                        placeholder="Name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    />
                    <input
                        className="input input-bordered input-sm"
                        placeholder="Amount"
                        type="number"
                        value={form.amount}
                        onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                    />
                    <input
                        className="input input-bordered input-sm"
                        placeholder="Deadline"
                        type="date"
                        value={form.deadline}
                        onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                    />
                    <select
                        className="select select-bordered select-sm"
                        value={form.status}
                        onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                    <button className="btn btn-sm btn-primary" onClick={handleAdd}>Add</button>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isScholarshipsArray ? scholarships.map((sch) => (
                            <tr key={sch.id}>
                                <td>
                                    {editingId === sch.id ? (
                                        <input
                                            className="input input-bordered input-xs"
                                            value={form.name}
                                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                                        />
                                    ) : (
                                        sch.name
                                    )}
                                </td>
                                <td>
                                    {editingId === sch.id ? (
                                        <input
                                            className="input input-bordered input-xs"
                                            type="number"
                                            value={form.amount}
                                            onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                                        />
                                    ) : (
                                        sch.amount
                                    )}
                                </td>
                                <td>
                                    {editingId === sch.id ? (
                                        <input
                                            className="input input-bordered input-xs"
                                            type="date"
                                            value={form.deadline}
                                            onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                                        />
                                    ) : (
                                        sch.deadline
                                    )}
                                </td>
                                <td>
                                    {editingId === sch.id ? (
                                        <select
                                            className="select select-bordered select-xs"
                                            value={form.status}
                                            onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    ) : (
                                        <span className={`badge badge-${sch.status === 'Active' ? 'success' : 'error'}`}>{sch.status}</span>
                                    )}
                                </td>
                                <td>
                                    {editingId === sch.id ? (
                                        <>
                                            <button
                                                className="btn btn-xs btn-success mr-2"
                                                onClick={() => handleSave(sch.id)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-xs btn-ghost"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-xs btn-primary mr-2"
                                                onClick={() => handleEdit(sch)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleDelete(sch.id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        )) : (
                            <tr><td colSpan="100%" className="text-red-500 text-center font-bold">Scholarship data is invalid.</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminScholarships;
