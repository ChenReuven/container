import React from 'react';

class MicroFrontend extends React.Component {
    componentDidMount() {
        const {name, host, document} = this.props;
        const scriptId = `micro-frontend-script-${name}`;

        if (document.getElementById(scriptId)) {
            this.renderMicroFrontend();
            return;
        }

        if (name === "Vue") {
            const scriptVendor = document.createElement('script');
            scriptVendor.id = scriptId + scriptId;
            scriptVendor.crossOrigin = '';
            const scriptVendorJsPath = '/js/chunk-vendors.1ad6e995.js';
            scriptVendor.src = `http://localhost:3004${scriptVendorJsPath}`;
            scriptVendor.onload = this.renderMicroFrontend;
            document.head.appendChild(scriptVendor);

            const script = document.createElement('script');
            script.id = scriptId;
            script.crossOrigin = '';
            const mainJsPath = '/js/app.2f599583.js';
            script.src = `http://localhost:3004${mainJsPath}`;
            //script.onload = this.renderMicroFrontend;
            document.head.appendChild(script);
        } else {
            fetch(`${host}/asset-manifest.json`)
                .then(res => res.json())
                .then(manifest => {
                    const script = document.createElement('script');
                    script.id = scriptId;
                    script.crossOrigin = '';
                    const mainJsPath = manifest['main.js'] || manifest.files['main.js'];
                    script.src = `${host}${mainJsPath}`;
                    script.onload = this.renderMicroFrontend;
                    document.head.appendChild(script);
                });
        }
    }

    componentWillUnmount() {
        const {name, window} = this.props;

        window[`unmount${name}`](`${name}-container`);
    }

    renderMicroFrontend = () => {
        const {name, window, history} = this.props;

        window[`render${name}`](`${name}-container`, history);
    };

    render() {
        return <main id={`${this.props.name}-container`}/>;
    }
}

MicroFrontend.defaultProps = {
    document,
    window,
};

export default MicroFrontend;
