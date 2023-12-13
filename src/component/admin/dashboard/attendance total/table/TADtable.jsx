const TADtable = ({ presence, permission, paidLeave, }) => {
    // Mengelompokkan data berdasarkan ID karyawan
    const groupedData = {};

    presence?.forEach((item) => {
        const { user, type, absen } = item;

        if (!groupedData[user?._id]) {
            groupedData[user?._id] = {
                employe: user?.name,
                divisi: user?.position,
                departement: user?.divisi,
                hadir: 0,
                ontime: 0,
                late: 0,
                absent: 0,
                izin: 0,
                cuti: 0,
            };
        }
        if (absen === 'Work From Office') {
            groupedData[user?._id].hadir++;
        }
        if (type === 'Present') {
            groupedData[user?._id].ontime++;
        } if (type === 'Late') {
            groupedData[user?._id].late++;
        } if (type === 'Absent') {
            groupedData[user?._id].absent++;
        }
    });

    permission?.forEach((item) => {
        const { user } = item;
        if (groupedData[user?._id]) {
            groupedData[user?._id].izin++;
        }
    });

    paidLeave?.forEach((item) => {
        const { user } = item;
        if (groupedData[user?._id]) {
            groupedData[user?._id].cuti++;
        }
    });
    console.log(groupedData);

    return (
        <div className="laptop:mt-5 hp:mt-40 w-full text-center hp:overflow-x-auto">
        <table className="laptop:w-full hp:w-[1000px]">
                <thead>
                    <tr className="bg-gray-200 text-primary">
                        <th className="p-4">No</th>
                        <th className="text-left">Employee</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Presence</th>
                        <th>Ontime</th>
                        <th>Late</th>
                        <th>Absent</th>
                        <th>Permission</th>
                        <th>Paid Leave</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(groupedData).map((id, index) => {
                        const item = groupedData[id];
                        return (
                            <tr key={index} className={index % 2 === 1 ? "bg-gray-100 text-center" : "text-center"}>
                                <td className="p-4">{index + 1}</td>
                                <td className="text-left">{item.employe}</td>
                                <td>{item.divisi}</td>
                                <td>{item.departement}</td>
                                <td>{item.hadir}</td>
                                <td>{item.ontime}</td>
                                <td>{item.late}</td>
                                <td>{item.absent}</td>
                                <td>{item.izin}</td>
                                <td>{item.cuti}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TADtable;
