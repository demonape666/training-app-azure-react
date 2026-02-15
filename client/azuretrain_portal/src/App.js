import { useEffect, useState } from 'react';
import './App.css';
import ProductTile from './product-tile/product-tile';
import { getProductCatalogue } from './service/product-service';

function App() {
  const [selection, setSelection] = useState("");
  const [productCatalogue, setProductCatalogue] = useState([]);
  const aboutUsText = "Laboris eiusmod consequat ut aliqua ipsum tempor veniam. Enim ex nisi ipsum enim ea sit ex sit laboris et enim. Labore ullamco ut magna ullamco ut ad exercitation incididunt et. Dolor dolore laboris ex et aliquip tempor et sed minim nostrud tempor incididunt sit elit. Ipsum magna laboris amet commodo consectetur eiusmod laboris tempor ut dolor dolor.";
  const optionsDefault = [
    {
      category: 'Electronics',
      color: 'green'
    },
    {
      category: 'Groceries',
      color: 'cyan'
    },
    {
      category: 'Curios',
      color: 'yellow'
    },
    {
      category: 'Apparels',
      color: 'violet'
    }
  ];

  const handleSelection = (data) => {
    setSelection(data);
  }

  useEffect(() => {
    const fetchProductCatalogue = async () => {
      try {
        const data = await getProductCatalogue(selection);
        setProductCatalogue(data);
      } catch (err) {
        console.log('error')
      } finally {
      }
    };
    if (selection) {
      fetchProductCatalogue();
    }
  }, [selection]);

  return (
    <div className="App-azuretraining">
      {/* Header stays constant here */}
      <div className="at-header">
        Lorem ipsum dolor Test
      </div>
      <div className='at-content'>
        {/* Content of app here. */}
        <div className='side-content'>
          <h1>IPSUM DOLOR</h1>
          <p> {aboutUsText}</p>
        </div>
        {productCatalogue?.length ? (<div className='main-content'>
          {productCatalogue.map((option, index) => {
            return (
              <ProductTile
                key={index}
                onProductSelection={handleSelection}
                textDisplay={option.textProduct}
                productDisplay={option.typeProduct}
                fileId={option.productId}
                colorDisplay={getClassName(option.color)}
              ></ProductTile>
            );
          })}
        </div>) : (<div className='main-content'>
          {optionsDefault.map((option, index) => {
            return (
              <ProductTile
                key={index}
                onProductSelection={handleSelection}
                textDisplay={option.category}
                colorDisplay={getClassName(option.color)}
              ></ProductTile>
            );
          })}
        </div>)}

      </div>
    </div>
  );
}

function getClassName(color) {
  return `product-tile ${color}`
}

export default App;
