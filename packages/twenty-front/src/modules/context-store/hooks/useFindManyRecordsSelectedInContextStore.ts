import { contextStoreCurrentObjectMetadataItemIdComponentState } from '@/context-store/states/contextStoreCurrentObjectMetadataItemIdComponentState';
import { contextStoreFiltersComponentState } from '@/context-store/states/contextStoreFiltersComponentState';
import { contextStoreTargetedRecordsRuleComponentState } from '@/context-store/states/contextStoreTargetedRecordsRuleComponentState';
import { computeContextStoreFilters } from '@/context-store/utils/computeContextStoreFilters';
import { useObjectMetadataItemById } from '@/object-metadata/hooks/useObjectMetadataItemById';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { useFilterValueDependencies } from '@/object-record/record-filter/hooks/useFilterValueDependencies';
import { useRecoilComponentValueV2 } from '@/ui/utilities/state/component-state/hooks/useRecoilComponentValueV2';

export const useFindManyRecordsSelectedInContextStore = ({
  instanceId,
  limit = 3,
}: {
  instanceId?: string;
  limit?: number;
}) => {
  const contextStoreCurrentObjectMetadataItemId = useRecoilComponentValueV2(
    contextStoreCurrentObjectMetadataItemIdComponentState,
    instanceId,
  );

  const { objectMetadataItem } = useObjectMetadataItemById({
    objectId: contextStoreCurrentObjectMetadataItemId ?? '',
  });

  const contextStoreTargetedRecordsRule = useRecoilComponentValueV2(
    contextStoreTargetedRecordsRuleComponentState,
    instanceId,
  );

  const contextStoreFilters = useRecoilComponentValueV2(
    contextStoreFiltersComponentState,
    instanceId,
  );

  const { filterValueDependencies } = useFilterValueDependencies();

  const queryFilter = computeContextStoreFilters(
    contextStoreTargetedRecordsRule,
    contextStoreFilters,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    objectMetadataItem!,
    filterValueDependencies,
  );

  const { records, loading, totalCount } = useFindManyRecords({
    objectNameSingular: objectMetadataItem?.nameSingular ?? '',
    filter: queryFilter,
    withSoftDeleted: true,
    orderBy: [
      {
        position: 'AscNullsFirst',
      },
    ],
    skip:
      contextStoreTargetedRecordsRule.mode === 'selection' &&
      contextStoreTargetedRecordsRule.selectedRecordIds.length === 0,
    limit,
  });

  return {
    records,
    totalCount,
    loading,
  };
};
