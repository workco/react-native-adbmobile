package co.work.rnadbmobile

import com.adobe.mobile.Config
import com.adobe.mobile.Analytics

import android.location.Location

import com.facebook.common.logging.FLog
import com.facebook.react.bridge.*

class RNADBMobileAnalytics(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), LifecycleEventListener {
    private val _tag = "RNADBMobileAnalytics"

    override fun getName() = _tag

    override fun getConstants(): Map<String, Any> = hashMapOf(
            "PROXIMITY_IMMEDIATE" to "PROXIMITY_IMMEDIATE",
            "PROXIMITY_NEAR" to "PROXIMITY_NEAR",
            "PROXIMITY_FAR" to "PROXIMITY_FAR",
            "PROXIMITY_UNKNOWN" to "PROXIMITY_UNKNOWN"
        )

    init {
        reactContext.addLifecycleEventListener(this)
        FLog.i(_tag, "added lifecycle event listener")
    }

    override fun onHostResume() = Config.collectLifecycleData(currentActivity)
    override fun onHostPause() =  Config.pauseCollectingLifecycleData()
    override fun onHostDestroy() {}

    @ReactMethod
    fun trackState(state: String, contextData: ReadableMap? = null) {
        Analytics.trackState(state, contextData?.toHashMap())
    }

    @ReactMethod
    fun trackAction(action: String, contextData: ReadableMap? = null) {
        Analytics.trackAction(action, contextData?.toHashMap())
    }

    @ReactMethod
    fun trackAdobeDeepLink(url: String) {}

    @ReactMethod
    fun trackLocation(coordinates: ReadableMap, contextData: ReadableMap? = null) {
        val location = Location("")

        location.latitude = coordinates.getDouble("latitude")
        location.longitude = coordinates.getDouble("longitude")

        if (coordinates.hasKey("altitude")) {
            location.altitude = coordinates.getDouble("altitude")
            if (android.os.Build.VERSION.SDK_INT >= 26 && coordinates.hasKey("altitudeAccuracy")) {
                location.verticalAccuracyMeters = coordinates.getDouble("altitudeAccuracy").toFloat()
            }
        }

        if (coordinates.hasKey("accuracy")) {
            location.accuracy = coordinates.getDouble("accuracy").toFloat()
        }

        if (coordinates.hasKey("heading")) {
            location.bearing = coordinates.getDouble("heading").toFloat()
        }

        if (coordinates.hasKey("speed")) {
            location.speed = coordinates.getDouble("speed").toFloat()
        }

        Analytics.trackLocation(location, contextData?.toHashMap())
    }

    @ReactMethod
    fun trackBeacon(uuid: String, major: String, minor: String, proximityName: String, contextData: ReadableMap? = null) {
        val proximity: Analytics.BEACON_PROXIMITY
        when (proximityName) {
            "PROXIMITY_IMMEDIATE" -> proximity = Analytics.BEACON_PROXIMITY.PROXIMITY_IMMEDIATE
            "PROXIMITY_NEAR" -> proximity = Analytics.BEACON_PROXIMITY.PROXIMITY_NEAR
            "PROXIMITY_FAR" -> proximity = Analytics.BEACON_PROXIMITY.PROXIMITY_FAR
            else -> proximity = Analytics.BEACON_PROXIMITY.PROXIMITY_UNKNOWN
        }
        Analytics.trackBeacon(uuid, major, minor, proximity, contextData?.toHashMap())
    }

    @ReactMethod
    fun clearBeacon() = Analytics.clearBeacon()

    @ReactMethod
    fun trackLifetimeValueIncrease(amount: Double, contextData: ReadableMap? = null) {
        Analytics.trackLifetimeValueIncrease(amount.toBigDecimal(), contextData?.toHashMap())
    }

    @ReactMethod
    fun trackTimedActionStart(action: String, contextData: ReadableMap? = null) {
        Analytics.trackTimedActionStart(action, contextData?.toHashMap())
    }

    @ReactMethod
    fun trackTimedActionUpdate(action: String, contextData: ReadableMap? = null) {
        Analytics.trackTimedActionUpdate(action, contextData?.toHashMap())
    }

    @ReactMethod
    fun trackTimedActionEnd(action: String, hit: Boolean) {
        val logic = { _: Long, _: Long, _: Map<String, Any> -> hit }
        Analytics.trackTimedActionEnd(action, logic)
    }

    @ReactMethod
    fun trackingTimedActionExists(action: String, promise: Promise) = promise.resolve(Analytics.trackingTimedActionExists(action))

    @ReactMethod
    fun getTrackingIdentifier(promise: Promise) = promise.resolve(Analytics.getTrackingIdentifier())

    @ReactMethod
    fun getQueueSize(promise: Promise) = promise.resolve(Analytics.getQueueSize().toDouble())

    @ReactMethod
    fun clearQueue() = Analytics.clearQueue()

    @ReactMethod
    fun sendQueuedHits() = Analytics.sendQueuedHits()
}
