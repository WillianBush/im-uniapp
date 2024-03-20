package uts.sdk.modules.uniUsercapturescreen;
import io.dcloud.uniapp.*;
import io.dcloud.uniapp.extapi.*;
import io.dcloud.unicloud.*;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import io.dcloud.uts.Set;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import kotlinx.coroutines.async;
import androidx.core.app.ActivityCompat;
import android.os.Build;
import android.os.Environment;
import java.io.File;
import android.os.FileObserver;
import android.Manifest;
import android.content.pm.PackageManager;
import java.lang.System;
import io.dcloud.uts.UTSAndroid;
import android.view.WindowManager;
open class OnUserCaptureScreenCallbackResult (
    open var path: String? = null,
) : UTSObject()
typealias UserCaptureScreenCallback = (res: OnUserCaptureScreenCallbackResult) -> Unit;
typealias OnUserCaptureScreen = (callback: UserCaptureScreenCallback?) -> Unit;
typealias OffUserCaptureScreen = (callback: UserCaptureScreenCallback?) -> Unit;
open class SetUserCaptureScreenSuccess : UTSObject() {
}
open class SetUserCaptureScreenFail (
    @JsonNotNull
    open var errCode: Number,
    @JsonNotNull
    open var errSubject: String,
    @JsonNotNull
    open var errMsg: String,
) : UTSObject()
typealias SetUserCaptureScreenSuccessCallback = (res: SetUserCaptureScreenSuccess) -> Unit;
typealias SetUserCaptureScreenFailCallback = (res: SetUserCaptureScreenFail) -> Unit;
typealias SetUserCaptureScreenCompleteCallback = (res: Any) -> Unit;
open class SetUserCaptureScreenOptions (
    @JsonNotNull
    open var enable: Boolean = false,
    open var success: SetUserCaptureScreenSuccessCallback? = null,
    open var fail: SetUserCaptureScreenFailCallback? = null,
    open var complete: SetUserCaptureScreenCompleteCallback? = null,
) : UTSObject()
typealias SetUserCaptureScreen = (options: SetUserCaptureScreenOptions) -> Unit;
var observer: ScreenFileObserver? = null;
var lastObserverTime: Number = 0;
var listener: UserCaptureScreenCallback? = null;
open class ScreenFileObserver : FileObserver {
    private var screenFile: File;
    constructor(screenFile: File) : super(screenFile) {
        this.screenFile = screenFile;
    }
    override fun onEvent(event: Int, path: String?): Unit {
        if (event == FileObserver.CREATE) {
            if (path != null) {
                val currentTime = System.currentTimeMillis();
                if ((currentTime - lastObserverTime) < 1000) {
                    return;
                }
                lastObserverTime = currentTime;
                val screenShotPath = File(this.screenFile, path).getPath();
                val res = OnUserCaptureScreenCallbackResult(path = screenShotPath);
                listener?.invoke(res);
            }
        }
    }
}
val onUserCaptureScreen: OnUserCaptureScreen = fun(callback: UserCaptureScreenCallback?) {
    if (ActivityCompat.checkSelfPermission(UTSAndroid.getAppContext()!!, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
        ActivityCompat.requestPermissions(UTSAndroid.getUniActivity()!!, arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), 1001);
        return;
    }
    listener = callback;
    var directory_screenshot: File;
    if (Build.MANUFACTURER.toLowerCase() == "xiaomi") {
        directory_screenshot = File(File(Environment.getExternalStorageDirectory(), Environment.DIRECTORY_DCIM), "Screenshots");
    } else {
        directory_screenshot = File(File(Environment.getExternalStorageDirectory(), Environment.DIRECTORY_PICTURES), "Screenshots");
    }
    observer?.stopWatching();
    observer = ScreenFileObserver(directory_screenshot);
    observer?.startWatching();
    UTSAndroid.onAppActivityDestroy(fun() {
        observer?.stopWatching();
        observer = null;
    }
    );
}
;
val offUserCaptureScreen: OffUserCaptureScreen = fun(_: UserCaptureScreenCallback?) {
    observer?.stopWatching();
    observer = null;
    lastObserverTime = 0;
}
;
val setUserCaptureScreen: SetUserCaptureScreen = fun(option: SetUserCaptureScreenOptions) {
    UTSAndroid.getUniActivity()?.runOnUiThread(SetUserCaptureScreenRunnable(option.enable));
    val res = SetUserCaptureScreenSuccess();
    option.success?.invoke(res);
    option.complete?.invoke(res);
}
;
open class SetUserCaptureScreenRunnable : Runnable {
    private var enable: Boolean;
    constructor(enable: Boolean) : super() {
        this.enable = enable;
    }
    override fun run(): Unit {
        if (this.enable) {
            UTSAndroid.getUniActivity()?.getWindow()?.clearFlags(WindowManager.LayoutParams.FLAG_SECURE);
        } else {
            UTSAndroid.getUniActivity()?.getWindow()?.addFlags(WindowManager.LayoutParams.FLAG_SECURE);
        }
    }
}
open class SetUserCaptureScreenOptionsJSONObject : UTSJSONObject() {
    open var enable: Boolean = false;
    open var success: UTSCallback? = null;
    open var fail: UTSCallback? = null;
    open var complete: UTSCallback? = null;
}
fun onUserCaptureScreenByJs(callback: UTSCallback?): Unit {
    return onUserCaptureScreen(fun(res: OnUserCaptureScreenCallbackResult){
        callback?.invoke(res);
    }
    );
}
fun offUserCaptureScreenByJs(callback: UTSCallback?): Unit {
    return offUserCaptureScreen(fun(res: OnUserCaptureScreenCallbackResult){
        callback?.invoke(res);
    }
    );
}
fun setUserCaptureScreenByJs(options: SetUserCaptureScreenOptionsJSONObject): Unit {
    return setUserCaptureScreen(SetUserCaptureScreenOptions(enable = options.enable, success = fun(res: SetUserCaptureScreenSuccess): Unit {
        options.success?.invoke(res);
    }
    , fail = fun(res: SetUserCaptureScreenFail): Unit {
        options.fail?.invoke(res);
    }
    , complete = fun(res: Any): Unit {
        options.complete?.invoke(res);
    }
    ));
}
