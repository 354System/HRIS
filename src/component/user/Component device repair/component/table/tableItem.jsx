

const TableItem = () => {
    return (
        <div className="mt-10">
            <table className="w-full">
                <thead className="">
                    <tr className="border-b-4 border-t-2 text-grey text-left">
                        <th className="p-4">Date</th>
                        <th className="">Title</th>
                        <th className="p-4">Kerusakan</th>
                        <th className="p-4">Estimasi Biaya</th>
                        <th className="p-4">Approval Status</th>
                    </tr>
                </thead>
                <tbody className="text-left">
                    {data.map(item => (
                        <tr key={item.id} className="border-b">
                            <td className="text-[#A332C3] p-2">{formatDate(item.date)}</td>
                            <td className="">{item.title}</td>
                            <td className="p-4">{item.damage}</td>
                            <td className="p-4">{item.cost}</td>
                            <td className="">
                                <span>{item.description}</span>
                                <span className="">{approvalStatus(item.approval)}</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableItem ;