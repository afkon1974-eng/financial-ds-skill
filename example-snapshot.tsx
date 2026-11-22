/* Выгружено из песочницы ДС (2026-11-22). Тема экрана: light. Сетка экрана: gridColumns=dense gridSidebar=minimal. */
import { Button } from 'src/components/Button/Button';
import { Input } from 'src/components/Input/Input';
import { MultiSelect } from 'src/components/MultiSelect/MultiSelect';
import { Tag } from 'src/components/Tag/Tag';

export default function Screen() {
  return (
    <div style={{ padding: 'var(--ds-space-6)' }}>
      <div style={{"display":"flex","flexDirection":"column","alignItems":"flex-start","alignSelf":"stretch","gap":"var(--ds-space-4)"}}>
        <div style={{"display":"flex","alignItems":"center","alignSelf":"stretch","justifyContent":"space-between","gap":"var(--ds-space-2)"}}>
          <span style={{"fontSize":"var(--ds-type-body-2-size)","lineHeight":"var(--ds-type-body-2c-lh)","fontWeight":"var(--ds-fw-md)","color":"var(--ds-text-primary)"}}>Платёж № 4812</span>
          <Tag variant="soft" semantic="info" size="sm" interactive={false}>В обработке</Tag>
        </div>
        <Input size="sm" label="Сумма" defaultValue="1 234 567,50" />
        <div style={{"alignSelf":"stretch","flex":"1 1 auto","minWidth":0}}>
          <MultiSelect size="lg" labelVariant="out" state="default" label="Счёт списания" options={[{"value":"Расчётный","label":"Расчётный"},{"value":"Валютный","label":"Валютный"},{"value":"Депозитный","label":"Депозитный"}]} defaultValue={["Расчётный"]} />
        </div>
        <div style={{"display":"flex","alignItems":"center","alignSelf":"stretch","justifyContent":"flex-end","gap":"var(--ds-space-2)"}}>
          <Button variant="ghost" width="fill" type="button">Отправить платёж</Button>
        </div>
      </div>
      {/* прототип: переход по клику → «Проверка кода/Экран» */}
      <Tag variant="outline" semantic="positive" interactive={false}>Метка</Tag>
    </div>
  );
}
