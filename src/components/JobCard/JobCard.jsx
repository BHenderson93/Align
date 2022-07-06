export default function JobCard({job , status}) {
    return (
            <div className="w-full flex flex-col justify-between items-left justify-around min-h-full bg-gray-200 p-8 border border-1 border-gray-300 drop-shadow-2xl rounded" style={{height:'25rem'}}>
                <div className="header flex items-base justify-between">
                    <h1 className="text-xl font-bold text-center mb-10">
                        {job.title}
                    </h1>
                    <div className="font-bold border overflow-hidden border-2 border-black rounded-full w-14 h-14 flex items-center justify-center">
                        <img src={job.company_logo} alt={job.company_name} />
                    </div>
                </div>
                <div className="flex flex-col gap-y-2">
                    <h2>
                        <span className="font-bold">Company:</span>
                        {job.company_name}
                    </h2>
                    <h2>
                        <span className="font-bold">Location:</span>{' '}
                        {job.candidate_required_location}
                    </h2>
                    <h2>
                        <span className="font-bold">Job type:</span>{' '}
                        {job.job_type}
                    </h2>
                    <h2>
                        <span className="font-bold">Date posted:</span>{' '}
                        {job.publication_date}
                    </h2>
                    {/* conditional rendering for apply date here */}
                </div>
                <div>
                    <button className="bg-blue-500 px-4 py-2 font-semibold rounded text-white hover:bg-blue-400 mt-14">
                        Apply Job
                    </button>                 
                    <button className="bg-blue-500 px-4 py-2 font-semibold rounded text-white hover:bg-blue-400 mt-14">
                        Track this Job
                    </button>
                    <button className="bg-blue-500 px-4 py-2 font-semibold rounded text-white hover:bg-blue-400 mt-14">
                        Mark as applied
                    </button>
                </div>
            </div>
    )
}