
package co.work.rnadbmobile

import com.adobe.mobile.Visitor
import com.adobe.mobile.VisitorID

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray

class RNADBMobileVisitor(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val _tag = "RNADBMobileVisitor"
    private val _E_FAILED_VISITOR_IDS = "E_FAILED_VISITOR_IDS"

    override fun getName() = _tag

    override fun getConstants(): Map<String, Any> = hashMapOf(
            "AUTH_STATE_UNKNOWN" to "AUTH_STATE_UNKNOWN",
            "AUTH_STATE_AUTHENTICATED" to "AUTH_STATE_AUTHENTICATED",
            "AUTH_STATE_LOGGED_OUT" to "AUTH_STATE_LOGGED_OUT"
        )

    @ReactMethod
    fun appendToURL(url: String, promise: Promise) {
        val urlWithID = Visitor.appendToURL(url)
        promise.resolve(urlWithID)
    }

    @ReactMethod
    fun getMarketingCloudId(promise: Promise) {
        val cid = Visitor.getMarketingCloudId()
        promise.resolve(cid)
    }

    private fun authenticationStateToString(state: VisitorID.VisitorIDAuthenticationState): String {
        when (state) {
            VisitorID.VisitorIDAuthenticationState.VISITOR_ID_AUTHENTICATION_STATE_AUTHENTICATED ->
                return "AUTH_STATE_AUTHENTICATED"
            VisitorID.VisitorIDAuthenticationState.VISITOR_ID_AUTHENTICATION_STATE_LOGGED_OUT ->
                return "AUTH_STATE_LOGGED_OUT"
            else ->
                return "AUTH_STATE_UNKNOWN"
        }
    }

    private fun authenticationStateFromString(authStateStr: String): VisitorID.VisitorIDAuthenticationState {
        when (authStateStr) {
            "AUTH_STATE_AUTHENTICATED" ->
                return VisitorID.VisitorIDAuthenticationState.VISITOR_ID_AUTHENTICATION_STATE_AUTHENTICATED
            "AUTH_STATE_LOGGED_OUT" ->
                return VisitorID.VisitorIDAuthenticationState.VISITOR_ID_AUTHENTICATION_STATE_LOGGED_OUT
            else ->
                return VisitorID.VisitorIDAuthenticationState.VISITOR_ID_AUTHENTICATION_STATE_UNKNOWN
        }
    }

    @ReactMethod
    fun getCustomerIDs(promise: Promise) {
        val array = Visitor.getIdentifiers();
        if (array == null) {
            promise.reject(_E_FAILED_VISITOR_IDS, "Unable to get visitor IDs")
            return
        }

        val output: MutableList<Map<String, String>> = mutableListOf()
        for (item in array) {
            val authStateStr = authenticationStateToString(item.authenticationState)
            val map: Map<String, String> = hashMapOf(
                "idType" to item.idType,
                "id" to item.id,
                "authState" to authStateStr
            )
            output.add(map)
        }

        promise.resolve(output)
    }

    @ReactMethod
    fun setCustomerIDs(input: ReadableArray) {
        for (i in 0..input.size() - 1) {
            val map = input.getMap(i)
            val idType = map.getString("idType")
            val identifier = map.getString("id")
            val authStateStr = map.getString("authState")
            val state = authenticationStateFromString(authStateStr)
            Visitor.syncIdentifier(idType, identifier, state)
        }
    }
}
