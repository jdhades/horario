 <?
   2. // vim: ts=4:sw=4:fdc=4:nu:nospell
   3. /**
   4. * Submit handler for Tabs in Form Example
   5. *
   6. * @author Ing. Jozef Sakáloš
   7. * @copyright (c) 2008, by Ing. Jozef Sakáloš
   8. * @date 29. May 2008
   9. * @version $Id: tabsinform.php 78 2008-06-06 09:22:10Z jozo $
  10. *
  11. * @license tabsinform.php is licensed under the terms of the Open Source
  12. * LGPL 3.0 license. Commercial use is permitted to the extent that the
  13. * code/component(s) do NOT become part of another Open Source or Commercially
  14. * licensed development library or toolkit without explicit permission.
  15. *
  16. * License details: http://www.gnu.org/licenses/lgpl.html
  */
   
  if("submit" === $_REQUEST["cmd"]) {
  header("Content-Type: application/json");
  echo '{"success":true}';
  }
  if("load" === $_REQUEST["cmd"]) {
  header("Content-Type: application/json");
  echo '{"success":true,"data":{"field1":"Field 1 value","combo1":1,"date1":"06/01/2008"}}';
  }
   
  // eof
  ?>
