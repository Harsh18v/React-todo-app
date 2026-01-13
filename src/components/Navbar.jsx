const Navbar = () => {
    return (
        <nav className="min-h-18 w-full max-w-md sm:max-w-2xl lg:max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center px-5 py-3 rounded-3xl bg-blue-300 border border-blue-900" >
            <div className="flex items-center text-blue-900  select-none">
                <h1 className="font-bold text-4xl">
                    Taskify
                </h1>
            </div>
        </nav>

    )
}

export default Navbar
