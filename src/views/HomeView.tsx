import {StyleRulesCallback} from '@material-ui/core/styles';
import * as React from 'react';
import Link from 'react-router-dom/Link';

import {HomeViewProps, HomeViewState} from '../types/views/home';
import {initComponent} from '../utils/components';
import {PageView} from './PageView';

const styles: StyleRulesCallback = () => ({
});

export class HomeViewBase extends React.PureComponent<HomeViewProps, HomeViewState> {
  render(): JSX.Element {
    const {name = 'home', title = 'Home'} = this.props;
    return (
      <PageView name={name} title={title}>
        <div>Home!</div>
        <Link to="/login">Goto Login!</Link>
        <div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Enim tortor at auctor urna nunc id. Eu sem integer vitae justo eget magna fermentum.
          Magnis dis parturient montes nascetur ridiculus. Nulla porttitor massa id neque aliquam vestibulum morbi
          blandit cursus. Sit amet luctus venenatis lectus magna fringilla urna. Erat nam at lectus urna duis
          convallis. Viverra accumsan in nisl nisi. Magna sit amet purus gravida quis blandit turpis cursus.
          Pellentesque elit ullamcorper dignissim cras tincidunt lobortis feugiat. Lacus viverra vitae congue
          eu consequat. At tellus at urna condimentum mattis pellentesque id nibh. Id venenatis a condimentum
          vitae sapien pellentesque habitant morbi tristique. Ante metus dictum at tempor commodo ullamcorper a
          lacus vestibulum. Nec tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Dapibus ultrices
          in iaculis nunc sed augue lacus viverra vitae. Id consectetur purus ut faucibus pulvinar elementum integer
          enim. In egestas erat imperdiet sed euismod nisi.</p></div>
        <div><p>Nibh sed pulvinar proin gravida hendrerit lectus a. Sed tempus urna et pharetra. Adipiscing at in
          tellus integer feugiat scelerisque varius morbi enim. Ut ornare lectus sit amet est. Elit sed vulputate
          mi sit amet. Viverra aliquet eget sit amet. Senectus et netus et malesuada fames ac turpis egestas
          maecenas. Volutpat consequat mauris nunc congue nisi vitae suscipit tellus. Ac odio tempor orci dapibus
          ultrices in iaculis nunc sed. Pellentesque massa placerat duis ultricies. Pulvinar elementum integer enim
          neque. Placerat vestibulum lectus mauris ultrices. Ac turpis egestas maecenas pharetra convallis posuere.
          Nisl tincidunt eget nullam non nisi est sit amet facilisis. Purus in massa tempor nec feugiat nisl.
          Pellentesque elit eget gravida cum sociis natoque penatibus et magnis. Tincidunt arcu non sodales neque
          sodales ut. Condimentum id venenatis a condimentum vitae.</p></div>
        <div><p>Elit scelerisque mauris pellentesque pulvinar. Maecenas accumsan lacus vel facilisis volutpat est.
          Pretium quam vulputate dignissim suspendisse in est ante in nibh. Nisi vitae suscipit tellus mauris a diam.
          In ornare quam viverra orci sagittis eu volutpat odio facilisis. Donec et odio pellentesque diam volutpat.
          Justo donec enim diam vulputate ut pharetra sit. Fermentum posuere urna nec tincidunt. Eget est lorem ipsum
          dolor sit amet. Posuere sollicitudin aliquam ultrices sagittis orci. Tellus orci ac auctor augue mauris
          augue neque gravida. Cursus eget nunc scelerisque viverra mauris in aliquam. In iaculis nunc sed augue
          lacus viverra vitae congue eu.</p></div>
        <div><p>Habitasse platea dictumst quisque sagittis purus. Sapien nec sagittis aliquam malesuada. Risus quis
          varius quam quisque id. Malesuada pellentesque elit eget gravida cum sociis natoque penatibus. Sed id
          semper risus in hendrerit. Pharetra pharetra massa massa ultricies mi quis hendrerit dolor magna. Ornare
          aenean euismod elementum nisi quis eleifend quam adipiscing. Sed nisi lacus sed viverra tellus in hac
          habitasse platea. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Amet risus nullam
          eget felis eget nunc lobortis mattis. Augue eget arcu dictum varius duis at consectetur lorem donec.
          Ullamcorper malesuada proin libero nunc consequat interdum varius sit. Duis at tellus at urna condimentum
          mattis.</p></div>
        <div><p>Bibendum ut tristique et egestas. Consectetur a erat nam at lectus urna duis convallis. Tincidunt
          augue interdum velit euismod in pellentesque massa placerat. Eleifend donec pretium vulputate sapien.
          Nibh tellus molestie nunc non blandit massa enim nec dui. Duis ultricies lacus sed turpis tincidunt id
          aliquet risus. Ornare lectus sit amet est placerat. Quam id leo in vitae turpis massa sed elementum.
          Placerat duis ultricies lacus sed turpis tincidunt. Justo eget magna fermentum iaculis eu non.</p></div>
        <div><p>In eu mi bibendum neque egestas congue quisque. Hac habitasse platea dictumst quisque sagittis.
          Eget mi proin sed libero enim sed. Eget lorem dolor sed viverra ipsum nunc aliquet. Ac auctor augue mauris
           augue neque gravida. Sagittis purus sit amet volutpat consequat mauris nunc congue. Morbi leo urna molestie
           at elementum. Imperdiet nulla malesuada pellentesque elit eget gravida cum sociis. Risus nec feugiat in
           fermentum posuere. Volutpat ac tincidunt vitae semper. Aenean et tortor at risus viverra adipiscing at in
           tellus. Porta non pulvinar neque laoreet. Porta nibh venenatis cras sed felis eget velit. Id consectetur
           purus ut faucibus pulvinar elementum integer. Ornare arcu odio ut sem nulla pharetra diam sit amet.</p></div>
        <div><p>Cras semper auctor neque vitae. Ornare arcu dui vivamus arcu. Varius morbi enim nunc faucibus a
          pellentesque sit. Enim nunc faucibus a pellentesque sit amet porttitor eget dolor. Egestas congue quisque
          egestas diam in arcu cursus. Sed augue lacus viverra vitae congue eu consequat. Malesuada fames ac turpis
          egestas sed tempus urna. Egestas purus viverra accumsan in nisl nisi scelerisque. Semper eget duis at tellus
          at urna condimentum mattis pellentesque. Vitae tempus quam pellentesque nec nam aliquam sem et tortor.
          Ultrices sagittis orci a scelerisque purus semper. Aenean vel elit scelerisque mauris pellentesque.
          Fames ac turpis egestas maecenas pharetra convallis posuere morbi leo. Nunc lobortis mattis aliquam
          faucibus purus in massa. Eget aliquet nibh praesent tristique magna. A pellentesque sit amet porttitor
          eget dolor morbi non. Sed euismod nisi porta lorem mollis. Pellentesque adipiscing commodo elit at.
          Imperdiet massa tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.</p></div>
        <div><p>Turpis cursus in hac habitasse platea dictumst quisque sagittis. Eu sem integer vitae justo eget
          magna fermentum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames. Nibh tellus
          molestie nunc non blandit massa enim nec dui. Tempus urna et pharetra pharetra massa massa ultricies mi.
          Nisl pretium fusce id velit ut. Hac habitasse platea dictumst vestibulum rhoncus est. Suspendisse faucibus
          interdum posuere lorem ipsum. Aliquam id diam maecenas ultricies mi eget mauris pharetra et. Lacus laoreet
          non curabitur gravida arcu ac. Aliquet risus feugiat in ante metus dictum at tempor. Nunc id cursus metus
          aliquam eleifend mi. Sit amet venenatis urna cursus eget. Sem viverra aliquet eget sit amet tellus. Blandit
          cursus risus at ultrices mi tempus imperdiet nulla.</p></div>
        <div><p>Rhoncus mattis rhoncus urna neque viverra justo. Pharetra diam sit amet nisl suscipit adipiscing
          bibendum est. Faucibus turpis in eu mi bibendum neque. Massa sapien faucibus et molestie ac feugiat sed
          lectus. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Eget nunc scelerisque
          viverra mauris. Odio ut enim blandit volutpat maecenas volutpat blandit aliquam. Netus et malesuada fames
          ac turpis egestas maecenas pharetra. Urna neque viverra justo nec. Elit pellentesque habitant morbi
          tristique senectus et netus et malesuada. Porta lorem mollis aliquam ut porttitor leo a diam sollicitudin.
          Imperdiet proin fermentum leo vel. Convallis posuere morbi leo urna molestie at elementum eu facilisis.
          Congue nisi vitae suscipit tellus mauris. Eu augue ut lectus arcu bibendum. Aliquam vestibulum morbi blandit
          cursus. Nunc vel risus commodo viverra maecenas accumsan lacus vel facilisis. Quis hendrerit dolor magna
          eget est lorem ipsum dolor sit. Gravida cum sociis natoque penatibus et magnis dis.</p></div>
        <div><p>Sit amet dictum sit amet justo donec enim diam vulputate. Ultrices gravida dictum fusce ut placerat
          orci nulla pellentesque dignissim. Sed turpis tincidunt id aliquet risus feugiat in. Tellus integer
          feugiat scelerisque varius morbi enim nunc faucibus a. Egestas dui id ornare arcu. Etiam non quam lacus
          suspendisse faucibus. Ultrices dui sapien eget mi. Erat velit scelerisque in dictum non consectetur a.
          Cras adipiscing enim eu turpis egestas pretium aenean pharetra magna. Ac tortor dignissim convallis aenean
          et tortor at risus. Risus nullam eget felis eget nunc. Urna nunc id cursus metus. Tellus in metus vulputate
          eu. Tincidunt ornare massa eget egestas purus.</p></div >
        <div><p>Hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque elit ullamcorper dignissim cras.
          Risus quis varius quam quisque id diam vel quam elementum. Sagittis purus sit amet volutpat consequat mauris
          nunc congue. Cum sociis natoque penatibus et magnis dis parturient. Tincidunt tortor aliquam nulla facilisi
          cras fermentum odio eu. Scelerisque mauris pellentesque pulvinar pellentesque habitant. Amet facilisis
          magna etiam tempor orci eu lobortis. Non sodales neque sodales ut etiam. Rhoncus est pellentesque elit
          ullamcorper dignissim cras tincidunt lobortis feugiat. Eget est lorem ipsum dolor sit amet consectetur.
          Neque gravida in fermentum et sollicitudin ac orci phasellus egestas. Est sit amet facilisis magna etiam
          tempor orci eu lobortis. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Non diam
          phasellus vestibulum lorem sed risus ultricies. Dui sapien eget mi proin sed libero enim sed.</p></div>
        <div><p>Justo donec enim diam vulputate ut. Elementum eu facilisis sed odio morbi quis commodo odio aenean.
          Magna etiam tempor orci eu lobortis. Nunc pulvinar sapien et ligula ullamcorper malesuada proin libero.
          Orci a scelerisque purus semper eget duis at. Tristique magna sit amet purus gravida quis blandit turpis
          cursus. Ut etiam sit amet nisl purus in. Nisl vel pretium lectus quam id leo in vitae. Bibendum enim
          facilisis gravida neque convallis a cras. Odio eu feugiat pretium nibh ipsum consequat nisl. Imperdiet
          proin fermentum leo vel orci. Aliquam nulla facilisi cras fermentum. Eu lobortis elementum nibh tellus
          molestie. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Interdum velit laoreet
          id donec. Neque egestas congue quisque egestas. Faucibus turpis in eu mi bibendum neque.</p></div>
        <div><p>Dolor morbi non arcu risus quis varius quam quisque id. Sed felis eget velit aliquet sagittis id
          consectetur. Pellentesque habitant morbi tristique senectus. Tempus quam pellentesque nec nam aliquam.
          Massa sapien faucibus et molestie ac feugiat sed. Ipsum dolor sit amet consectetur adipiscing elit ut
          aliquam. Ac tincidunt vitae semper quis lectus. In nulla posuere sollicitudin aliquam ultrices sagittis
          orci a. Quam id leo in vitae. Nam aliquam sem et tortor consequat. Consequat mauris nunc congue nisi
          vitae suscipit tellus mauris. Velit euismod in pellentesque massa placerat duis. Interdum velit euismod
          in pellentesque. Pulvinar neque laoreet suspendisse interdum. Habitant morbi tristique senectus et netus
          et malesuada fames ac. Eu nisl nunc mi ipsum faucibus vitae aliquet nec. Sed felis eget velit aliquet
          sagittis id consectetur purus ut. Dignissim cras tincidunt lobortis feugiat vivamus.</p></div>
        <div><p>Phasellus egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Tempor orci eu
          lobortis elementum. Lacus sed viverra tellus in hac habitasse. Bibendum at varius vel pharetra. Odio
          pellentesque diam volutpat commodo sed egestas egestas. Mi tempus imperdiet nulla malesuada pellentesque
          elit. Eget nunc lobortis mattis aliquam faucibus. Mattis aliquam faucibus purus in massa tempor nec
          feugiat nisl. Interdum velit laoreet id donec ultrices tincidunt arcu. Proin fermentum leo vel orci porta
          non pulvinar neque laoreet. Eget duis at tellus at urna condimentum mattis pellentesque id. Mauris vitae
          ultricies leo integer malesuada nunc. Scelerisque varius morbi enim nunc faucibus a pellentesque.</p></div>
        <div><p>Leo vel fringilla est ullamcorper eget nulla facilisi etiam. Sed adipiscing diam donec adipiscing
          tristique risus. Id leo in vitae turpis massa sed elementum tempus. Ut tristique et egestas quis ipsum
          suspendisse ultrices gravida dictum. Pellentesque habitant morbi tristique senectus et netus et. Mauris
          pharetra et ultrices neque ornare aenean euismod elementum nisi. Varius vel pharetra vel turpis. Nibh
          nisl condimentum id venenatis a. Urna nunc id cursus metus aliquam eleifend. Nibh mauris cursus mattis
          molestie a iaculis. Mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Elit at imperdiet
          dui accumsan sit amet. Ullamcorper morbi tincidunt ornare massa eget egestas. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Lacus vel facilisis volutpat est velit egestas dui.
          Nec ullamcorper sit amet risus nullam eget felis eget nunc. In hendrerit gravida rutrum quisque non
          tellus. Scelerisque eu ultrices vitae auctor eu augue ut. Tellus cras adipiscing enim eu turpis egestas
          pretium.</p></div>
      </PageView>
    );
  }
}

export const HomeView = initComponent(module, HomeViewBase, styles);
export default HomeView;
