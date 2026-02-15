import './product-tile.css';
import { downloadProductSelected, checkoutProduct } from './../service/product-service';
function ProductTile({ textDisplay, colorDisplay, onProductSelection, productDisplay, fileId }) {

    const downloadFile = async () => {
        try {
            const data = await downloadProductSelected(fileId);
            // Convert response to Blob

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(data);
            window.open(url, '_blank')

        } catch (err) {
            console.log('error')
        } finally {
        }
    };

    const checkoutProductSelected = async () => {
        try {
            const data = await checkoutProduct(textDisplay);
            alert(data);

        } catch (err) {
            console.log('error')
        } finally {
        }
    }
    const selectProduct = (data) => {
        onProductSelection(textDisplay);
    }
    return (
        <div className={colorDisplay}
        >
            <span>{textDisplay}</span>
            {productDisplay ? (<div className="button-group"><button onClick={downloadFile}>Download</button><button onClick={checkoutProductSelected}>Checkout</button></div>) :
                (<button onClick={selectProduct} className='show-button'>Explore</button>)}


        </div>
    );
}

export default ProductTile;
