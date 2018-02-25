
package co.work.rnadbmobile

import java.util.ArrayList
import java.util.Collections
import java.util.Collections.emptyList

import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.ReactPackage
import com.facebook.react.uimanager.ViewManager

class RNADBMobilePackage : ReactPackage {
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList<ViewManager<*, *>>()
    }

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        val modules = ArrayList<NativeModule>()

        modules.add(RNADBMobileConfig(reactContext))
        modules.add(RNADBMobileAnalytics(reactContext))

        return modules
    }
}
