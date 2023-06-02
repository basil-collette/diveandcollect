const OverlayModal = (props: any) => {

    return (
        <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-70 p-16" style={{zIndex: 400}}>
            <div className="relative text-xl w-full h-full flex flex-col bg-lagon text-outremer rounded-xl shadow-2xl p-16">
                
                <span className="absolute top-8 right-8 text-white cursor-pointer hover:text-fushia"
                    onClick={() => {props.hideModal()}}
                    >
                    X
                </span>

                {props.children}

            </div>
        </div>
    );
};

export default OverlayModal;
