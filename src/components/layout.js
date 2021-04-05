const Layout = (props) => {
    
    // const { title = "RUNEX" } = props

    return(
        <>
            <main className="mt-3">
                <div className="container">{props.children}</div>
            </main>
        </>
    )
}

export default Layout