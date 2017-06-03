import static spark.Spark.get;
import static spark.Spark.post;

/**
 * Created by Laur Stanciu on 6/3/2017.
 */
public class AccountsResource {
    private static final String API_CONTEXT = "/api";

    private final AccountsService accountsService;

    public AccountsResource(AccountsService accountsService){
        this.accountsService = accountsService;
        setupEndpoints();
    }

    private void setupEndpoints(){
        post(API_CONTEXT + "/sign-up", "application/json",(request, response) -> {
            accountsService.signUp(request.body());
            response.status(200);
            return response;
        });

        get(API_CONTEXT + "/sign-in", "application/json",(request, response) ->
                accountsService.signIn(request.body()), new JsonTransformer());

    }
}