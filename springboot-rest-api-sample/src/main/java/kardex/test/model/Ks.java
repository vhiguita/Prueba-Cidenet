package kardex.test.model;

import java.util.ArrayList;
import java.util.List;

public class Ks {
	private List<K> kList;
	
	public List<K> getKList() {
	        if(kList == null) {
	            kList = new ArrayList<>();
	        }
	        return kList;
	}
	
	public void setKList(List<K> kList) {
	        this.kList = kList;
	}
	
	

}
