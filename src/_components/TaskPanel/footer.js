import { useNavigate } from "react-router-dom"

export function Footer() {
    const navigate = useNavigate()

    return (
        <footer className="task-panel__footer">
            <button type="button" className="task-panel__footer-button" onClick={() => navigate('../')}><i className="bx bx-exit"></i></button>
            <br className="task-panel__footer-separator" />
            <button type="submit" className="task-panel__footer-button task-panel__footer-button--done"><i className="bx bx-check"></i></button>
        </footer>
    )
}