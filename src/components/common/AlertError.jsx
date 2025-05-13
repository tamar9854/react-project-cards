

function AlertError({ error }) {

    return (
        <div className="row">
            <div className="col-sm-12">
                <div className={`alert alert-warning alert-dismissible fade ${!error ? '' : 'show'}`} role="alert">
                    <strong>{error}</strong>
                    <button type="button" className="btn-close" onClick={() => setError(null)} aria-label="Close"></button>
                </div>
            </div>
        </div>
    )
}

export default AlertError;