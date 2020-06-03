package kardex.test.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import kardex.test.dao.ProductDAO;
import kardex.test.model.Product;
import kardex.test.model.Products;

import kardex.test.dao.KDAO;
import kardex.test.model.K;
import kardex.test.model.Ks;


@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping(path = "/products")
public class KardexController {
	@Autowired
    private ProductDAO productDao;
	
	
	@GetMapping(path="/productList", produces = "application/json")
    public Products getProducts() 
    {
        return productDao.getAllProducts();
    }
	
	@Autowired
    private KDAO kDao;
	
	@GetMapping(path="/kardexList", produces = "application/json")
    public Ks getKs() 
    {
        return kDao.getAllKs();
    }
	
	@GetMapping(path="/kList", produces = "application/json")
    public List<K> getK(@RequestParam String prodCode) 
    {
        return kDao.getK(prodCode);
    }
	
	@GetMapping(path="/kMaxFinalStock")
    public String getMaxFinalStock(@RequestParam String prodCode) 
    {
        return kDao.getMaxFinalStock(prodCode);
    }
	
	@PostMapping(path= "/productAdd", consumes = "application/json", produces = "application/json")
	public ResponseEntity<Object> addProduct(
	                        @RequestHeader(name = "X-COM-PERSIST", required = false) String headerPersist,
	                        @RequestHeader(name = "X-COM-LOCATION", required = false, defaultValue = "ASIA") String headerLocation,
	                        @RequestBody Product product) 
	                 throws Exception 
    {       
	        //Generate resource id
	        //Integer id = employeeDao.getAllEmployees().getEmployeeList().size() + 1;
	        //employee.setId(id);
	        
	        //add resource
	        productDao.addProduct(product);
	        
	        //Create resource location
	        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
	                                    .path("/{productCode}")
	                                    .buildAndExpand(product.getProductCode())
	                                    .toUri();
	        
	        //Send location in response
	        return ResponseEntity.created(location).build();
	}
	
	
	@PostMapping(path= "/productDelete", consumes = "application/json", produces = "application/json")
	public ResponseEntity<Object> deleteProduct(
	                        @RequestHeader(name = "X-COM-PERSIST", required = false) String headerPersist,
	                        @RequestHeader(name = "X-COM-LOCATION", required = false, defaultValue = "ASIA") String headerLocation,
	                        @RequestBody Product product) 
	                 throws Exception 
    {       
	        //Generate resource id
	        //Integer id = employeeDao.getAllEmployees().getEmployeeList().size() + 1;
	        //employee.setId(id);
	        
	        //add resource
	        productDao.removeProduct(product);
	        
	        //Create resource location
	        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
	                                    .path("/{productCode}")
	                                    .buildAndExpand(product.getProductCode())
	                                    .toUri();
	        
	        //Send location in response
	        return ResponseEntity.created(location).build();
	}
	
	@PostMapping(path= "/kardexAdd", consumes = "application/json", produces = "application/json")
	public ResponseEntity<Object> addKardex(
	                        @RequestHeader(name = "X-COM-PERSIST", required = false) String headerPersist,
	                        @RequestHeader(name = "X-COM-LOCATION", required = false, defaultValue = "ASIA") String headerLocation,
	                        @RequestBody K k) 
	                 throws Exception 
    {       
	        //Generate resource id
	        Integer id = kDao.getAllKs().getKList().size() + 1;
	        k.setId(id);
	        
	        //add resource
	        kDao.addK(k);
	        
	        //Create resource location
	        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
	                                    .path("/{id}")
	                                    .buildAndExpand(k.getId())
	                                    .toUri();
	        
	        //Send location in response
	        return ResponseEntity.created(location).build();
	}
	
}
