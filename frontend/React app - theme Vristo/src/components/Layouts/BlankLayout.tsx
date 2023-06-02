import { PropsWithChildren } from 'react';
import App from '../../App';
import TopNav from '../../components/TopNav';

const BlankLayout = ({ children }: PropsWithChildren) => {
    return (
        <App>
            <div className="relative flex flex-col min-h-screen h-px">
                <TopNav />
                {children}
            </div>
        </App>
    );
};

export default BlankLayout;
