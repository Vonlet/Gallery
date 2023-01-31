function quaternionMove(object, Radian, AxisX, AxisY, AxisZ){
    //クォータニオンを使うとオイラー角は使用できなくなります。
    //object.useQuaternion = true;
  
    // 1. 回転させたいObjectのQuaternionを取得する
    var quaternion = object.quaternion;
    
    // 2. 回転を加えるためのQuaternionを作成する
    var target = new THREE.Quaternion();
    var axis = new THREE.Vector3(AxisX, AxisY, AxisZ).normalize();
    target.setFromAxisAngle(axis, Radian);
    
    // 3. 回転させる
    quaternion.multiply(target);
  }