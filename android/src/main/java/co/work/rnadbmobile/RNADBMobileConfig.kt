
package co.work.rnadbmobile

import com.adobe.mobile.Config
import com.adobe.mobile.MobilePrivacyStatus

import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap

class RNADBMobileConfig(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    private val _tag = "RNADBMobileConfig"

    override fun getName() = _tag

    override fun getConstants(): Map<String, Any> = hashMapOf(
            "version" to Config.getVersion(),
            "APPLICATION_TYPE_HANDHELD" to "APPLICATION_TYPE_HANDHELD",
            "APPLICATION_TYPE_WEARABLE" to "APPLICATION_TYPE_WEARABLE",
            "MOBILE_PRIVACY_STATUS_OPT_IN" to "MOBILE_PRIVACY_STATUS_OPT_IN",
            "MOBILE_PRIVACY_STATUS_OPT_OUT" to "MOBILE_PRIVACY_STATUS_OPT_OUT",
            "MOBILE_PRIVACY_STATUS_UNKNOWN" to "MOBILE_PRIVACY_STATUS_UNKNOWN"
        )

    init {
        Config.setContext(reactContext.applicationContext)
    }

    @ReactMethod
    fun getApplicationType(promise: Promise) {
        val applicationTypeName: String
        when (Config.getApplicationType()) {
            Config.ApplicationType.APPLICATION_TYPE_HANDHELD -> applicationTypeName = "APPLICATION_TYPE_HANDHELD"
            Config.ApplicationType.APPLICATION_TYPE_WEARABLE -> applicationTypeName = "APPLICATION_TYPE_WEARABLE"
            else -> applicationTypeName = "APPLICATION_TYPE_UNKNOWN"
        }
        promise.resolve(applicationTypeName)
    }

    @ReactMethod
    fun setApplicationType(appTypeName: String) {
        val appType: Config.ApplicationType
        when (appTypeName) {
            "APPLICATION_TYPE_HANDHELD" -> appType = Config.ApplicationType.APPLICATION_TYPE_HANDHELD
            "APPLICATION_TYPE_WEARABLE" -> appType = Config.ApplicationType.APPLICATION_TYPE_WEARABLE
            else -> return
        }
        Config.setApplicationType(appType)
    }

    @ReactMethod
    fun getPrivacyStatus(promise: Promise) {
        val statusName: String
        when (Config.getPrivacyStatus()) {
            MobilePrivacyStatus.MOBILE_PRIVACY_STATUS_OPT_IN -> statusName = "MOBILE_PRIVACY_STATUS_OPT_IN"
            MobilePrivacyStatus.MOBILE_PRIVACY_STATUS_OPT_OUT -> statusName = "MOBILE_PRIVACY_STATUS_OPT_OUT"
            else -> statusName = "MOBILE_PRIVACY_STATUS_UNKNOWN"
        }
        promise.resolve(statusName)
    }

    @ReactMethod
    fun setPrivacyStatus(statusName: String) {
        val status: MobilePrivacyStatus
        when (statusName) {
            "MOBILE_PRIVACY_STATUS_OPT_IN" -> status = MobilePrivacyStatus.MOBILE_PRIVACY_STATUS_OPT_IN
            "MOBILE_PRIVACY_STATUS_OPT_OUT" -> status = MobilePrivacyStatus.MOBILE_PRIVACY_STATUS_OPT_OUT
            else -> status = MobilePrivacyStatus.MOBILE_PRIVACY_STATUS_UNKNOWN
        }
        Config.setPrivacyStatus(status)
    }

    @ReactMethod
    fun getUserIdentifier(promise: Promise) = promise.resolve(Config.getUserIdentifier())

    @ReactMethod
    fun setUserIdentifier(identifier: String) = Config.setUserIdentifier(identifier)

    @ReactMethod
    fun setPushIdentifier(registrationId: String) = Config.setPushIdentifier(registrationId)

    @ReactMethod
    fun getDebugLogging(promise: Promise) = promise.resolve(Config.getDebugLogging())

    @ReactMethod
    fun setDebugLogging(debugLogging: Boolean) = Config.setDebugLogging(debugLogging)

    @ReactMethod
    fun getLifetimeValue(promise: Promise) = promise.resolve(Config.getLifetimeValue().toString())

    @ReactMethod
    fun collectLifecycleData(contextData: ReadableMap? = null) = Config.collectLifecycleData(currentActivity, contextData?.toHashMap())

    @ReactMethod
    fun pauseCollectingLifecycleData() = Config.pauseCollectingLifecycleData()

    @ReactMethod
    fun setIconResourceIds(resourcesMap: ReadableMap) {
        if (resourcesMap.hasKey("small")) {
            Config.setSmallIconResourceId(resourcesMap.getInt("small"))
        }
        if (resourcesMap.hasKey("large")) {
            Config.setLargeIconResourceId(resourcesMap.getInt("large"))
        }
    }

    @ReactMethod
    fun setAdvertisingIdentifier(idfa: String? = null) {}
}
