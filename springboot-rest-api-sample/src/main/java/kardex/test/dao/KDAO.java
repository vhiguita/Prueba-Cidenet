package kardex.test.dao;

import kardex.test.model.K;
import kardex.test.model.Ks;
import java.util.List;

import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

@Repository
public class KDAO {
    private static Ks list = new Ks();
    
    static 
    {
        list.getKList().add(new K(1, "XUA-121", 0,"Compra",100,100));
        list.getKList().add(new K(2, "XUA-121", 100,"Compra",50,150));
       
    }
    
    public Ks getAllKs() 
    {
        return list;
    }
    public List<K> getK(String prodCode) {
    	
    	
    	List<K> result = list.getKList().stream().filter(item -> item.getProductCode().equals(prodCode))
    		     .collect(Collectors.toList());
    	
    	return result;
    }
    
    public String getMaxFinalStock(String prodCode) {
    	List<K> result = list.getKList().stream().filter(item -> item.getProductCode().equals(prodCode))
   		     .collect(Collectors.toList());
   	
        String val = String.valueOf(result.stream().mapToInt(K::getFinalStock).max().orElse(Integer.MIN_VALUE));
      
        return val;
    }
    
    
    public void addK(K kardex) {
        list.getKList().add(kardex);
    }
}
