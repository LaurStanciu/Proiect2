import com.google.gson.Gson;
import spark.Response;
import spark.ResponseTransformer;

import java.util.HashMap;
/**
 * Created by HP Pavilion i5-3230M on 22/04/2017.
 */
public class JsonTransformer implements ResponseTransformer {
    private Gson gson = new Gson();

    public String render(Object model){
        return gson.toJson(model);
    }
}
