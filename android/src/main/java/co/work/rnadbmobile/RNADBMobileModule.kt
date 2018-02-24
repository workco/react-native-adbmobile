
package co.work.rnadbmobile

import com.facebook.common.logging.FLog

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

import com.facebook.react.common.ReactConstants

class RNADBMobileModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "RNADBMobile"

    override fun getConstants(): kotlin.collections.Map<String, Any> {
        val constants = HashMap<String, Any>()
        constants.put("myConstant", "value")
        return constants
    }

    @ReactMethod
    fun myMethod(arg: String): Unit {
        FLog.i(ReactConstants.TAG, "myMethod: $arg")
    }
}
