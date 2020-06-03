package kardex.test.dao;

import org.springframework.stereotype.Repository;

import kardex.test.model.Product;
import kardex.test.model.Products;

@Repository
public class ProductDAO {
    private static Products list = new Products();
    
    static 
    {
        list.getProductList().add(new Product("XUA-121", "Camisa Marvel"));
       
    }
    
    public Products getAllProducts() 
    {
        return list;
    }
    
    public void addProduct(Product product) {
        list.getProductList().add(product);
    }
    public void removeProduct(Product product){
    	//System.out.println(product.getProductCode());
    	String prodCode = product.getProductCode();
    	try {
    	  list.getProductList().removeIf(prod -> prod.getProductCode().equals(prodCode));	
    	}catch(Exception e) {
    	  System.out.println("No se puede eliminar el objeto.");
    	}	
    }
}
